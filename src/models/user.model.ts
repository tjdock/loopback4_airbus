import {Entity, model, property} from '@loopback/repository';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    defaultFn:'uuidv4'
  })
  id?: string;

  @property({
    type: 'string',
    id: true
  })
  account?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
    required:true
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
