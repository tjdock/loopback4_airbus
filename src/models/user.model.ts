import {Entity, model, property} from '@loopback/repository';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    defaultFn:'uuidv4',
    id: true
  })
  id?: string;

  //TODO 账号不能重复 没有找到合适的解决方案
  @property({
    type: 'string',
  })
  account?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
    required:false
  })
  password: string;

  @property({
    type: 'string',
  })
  role?: string;

  @property({
    type: 'date',
    defaultFn:'now'
  })
  lastActiveTime?: string;


  constructor(data?: Partial<User>) {
    super(data);
  }
}
