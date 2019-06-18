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
import {UserRepository} from '../repositories';
import {utils} from '../utils';

export class UserController {
    constructor(
        @repository(UserRepository)
        public userRepository: UserRepository,
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
        user.password = utils.hash(user.password);
        if (user.account) {
            user.account = user.account.toLowerCase();
        }

        return await this.userRepository.create(user);
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
        @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
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
                content: {'application/json': {schema: {'x-ts-type': User}}}
            }
        }
    })
    async login(@requestBody() user: User): Promise<User | null> {
        return await this.userRepository.findOne(
            {where: {account: user.account, password: utils.hash(user.password)}}
        )
    }
}
