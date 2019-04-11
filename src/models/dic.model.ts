import {Entity, model, property} from '@loopback/repository';

@model()
export class Dic extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: false,
  })
  type: string;

  @property({
    type: 'string',
    required: false,
  })
  value: string;


  constructor(data?: Partial<Dic>) {
    super(data);
  }
}
