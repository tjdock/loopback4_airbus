import {
    Count,
    CountSchema,
    Filter,
    repository,
    Where,
} from '@loopback/repository';
import {
    post,
    param,
    get,
    getFilterSchemaFor,
    getWhereSchemaFor,
    patch,
    put,
    del,
    requestBody,
} from '@loopback/rest';
import {User} from '../models';
import {Credentials, UserRepository} from '../repositories';
import {inject} from "@loopback/context";
import {PasswordHasherBindings, TokenServiceBindings, UserServiceBindings} from "../keys";
import {PasswordHasher} from '../services';
import {TokenService, UserService} from "@loopback/authentication";
import {HttpErrors} from "@loopback/rest";

export class UserController {
    constructor(
        @repository(UserRepository) public userRepository: UserRepository,
        @inject(PasswordHasherBindings.PASSWORD_HASHER) public passwordHasher: PasswordHasher,
        @inject(TokenServiceBindings.TOKEN_SERVICE) public jwtService: TokenService,
        @inject(UserServiceBindings.USER_SERVICE) public userService: UserService<User, Credentials>,
    ) {
    }

    @post('/users', {
        responses: {
            '200': {
                description: 'User model instance',
                content: {'application/json': {schema: {'x-ts-type': User}}},
            },
        },
    })
    async create(@requestBody() user: User): Promise<User> {
        // ensure a valid email value and password value
        //validateCredentials(_.pick(user, ['email', 'password']));


        user.password = await this.passwordHasher.hashPassword(user.password);
        if (user.email) {
            user.email = user.email.toLowerCase();
        }

        try {
            // create the new user
            const savedUser = await this.userRepository.create(user);
            delete savedUser.password;

            return savedUser;
        } catch (error) {
            // MongoError 11000 duplicate key，json数据库不管用
            if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
                throw new HttpErrors.Conflict('Email value is already taken');
            } else {
                throw error;
            }
        }
    }

    @get('/users/count', {
        responses: {
            '200': {
                description: 'User model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(
        @param.query.object('where', getWhereSchemaFor(User)) where?: Where
    ): Promise<Count> {
        return await this.userRepository.count(where);
    }

    @get('/users', {
        responses: {
            '200': {
                description: 'Array of User model instances',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: {'x-ts-type': User}},
                    },
                },
            },
        },
    })
    async find(
        @param.query.object('filter', getFilterSchemaFor(User)) filter?: Filter,
    ): Promise<User[]> {
        return await this.userRepository.find(filter);
    }

    @patch('/users', {
        responses: {
            '200': {
                description: 'User PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody() user: User,
        @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
    ): Promise<Count> {
        return await this.userRepository.updateAll(user, where);
    }

    @get('/users/{id}', {
        responses: {
            '200': {
                description: 'User model instance',
                content: {'application/json': {schema: {'x-ts-type': User}}},
            },
        },
    })
    async findById(@param.path.string('id') id: string): Promise<User> {
        return await this.userRepository.findById(id);
    }

    @patch('/users/{id}', {
        responses: {
            '204': {
                description: 'User PATCH success',
            },
        },
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody() user: User,
    ): Promise<void> {
        await this.userRepository.updateById(id, user);
    }

    @put('/users/{id}', {
        responses: {
            '204': {
                description: 'User PUT success',
            },
        },
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() user: User,
    ): Promise<void> {
        await this.userRepository.replaceById(id, user);
    }

    @del('/users/{id}', {
        responses: {
            '204': {
                description: 'User DELETE success',
            },
        },
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.userRepository.deleteById(id);
    }

    @post('/users/login', {
        responses: {
            '200': {
                description: '登录',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                token: {type: 'string'}
                            }
                        }
                    }
                }
            }
        }
    })
    async login(@requestBody() credentials: Credentials): Promise<{token:string}> {
        // return await this.userRepository.findOne(
        //     {where: {account: user.account, password: utils.hash(user.password)}}
        // )
        // ensure the user exists, and the password is correct
        const user = await this.userService.verifyCredentials(credentials);

        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = this.userService.convertToUserProfile(user);

        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);

        return {token};
    }
}
