import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import * as path from 'path';
import {MyAuthenticationSequence} from './sequence';
//添加验证
import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
import {TokenServiceBindings,TokenServiceConstants,PasswordHasherBindings,UserServiceBindings} from "./keys";
import {JWTService,BcryptHasher,MyUserService} from "./services";
import {JWTAuthenticationStrategy} from "./authentication-strategies/jwt-strategy";


export class StarterApplicaiton extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    //设置绑定内容
    this.setUpBindings();

    //绑定验证控件
    this.component(AuthenticationComponent);

    //定义JWT规则
    registerAuthenticationStrategy(this, JWTAuthenticationStrategy);

    //设置验证顺序
    this.sequence(MyAuthenticationSequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  setUpBindings(): void {
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(
        TokenServiceConstants.TOKEN_SECRET_VALUE,
    );
    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
        TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
    );
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);
    this.bind(PasswordHasherBindings.ROUNDS).to(10);
    this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);
    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);
  }
}
