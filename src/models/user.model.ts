import {Entity, model, property} from '@loopback/repository';

@model({
  settings:{
    indexes:{
      uniqueEmail:{
        keys:{email:1},//升序
        options:{unique:true}
      }
    }
  }
})
export class User extends Entity {
  @property({
    type: 'string',
    defaultFn:'uuidv4',
    id: true
  })
  id: string;

  //TODO 账号不能重复 json数据库没有找到合适的解决方案
  @property({
    type: 'string',
    required:true
  })
  email: string;

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
