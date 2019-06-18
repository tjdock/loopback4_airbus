import {hasMany, Entity, model, property} from '@loopback/repository';
import {Ticket} from "./ticket.model";

@model()
export class Restds extends Entity {
  @property({
    type: 'string',
  })
  Code: string;

  @property({
    type: 'string',
  })
  Msg: string;

  @property({
    type: 'number',
  })
  TotalPage: number;


  @hasMany(() => Ticket)
  @property.array(Ticket)
  Ticket: Ticket[];

  constructor(data?: Partial<Restds>) {
    super(data);
  }
}
