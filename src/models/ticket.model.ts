import {Entity, model, property} from '@loopback/repository';

@model()
export class Ticket extends Entity {
  @property({type: 'string'})
  ID: string;

  @property({type: 'string'})
  Code: string;

  @property({type: 'string'})
  MerchantName: string;

  @property({type: 'string'})
  ShopName: string;

  @property({type: 'string'})
  TickerName: string;

  @property({type: 'number'})
  TotalScore: number;

  @property({type: 'number'})
  RemainingScore: number;

  @property({type: 'string'})
  StartDate: string;

  @property({type: 'string'})
  EndDate: string;

  @property({type: 'string'})
  ServiceName: string;

  @property({type: 'string'})
  ServiceTel: string;

  @property({type: 'string'})
  TicketNum: string;

  @property({type: 'string'})
  TicketType: string;

  @property({type: 'string'})
  StateType: string;

  constructor(data?: Partial<Ticket>) {
    super(data);
  }
}
