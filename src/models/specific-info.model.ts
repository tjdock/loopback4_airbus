import {Entity, model, property,belongsTo} from '@loopback/repository';
import {GeneralInfo} from "./general-info.model";


@model()
export class SpecificInfo extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @belongsTo(()=>GeneralInfo)
  //@property()
  generalInfoId?: number;

  @property({
    type: 'string',
  })
  customerName?: string;

  @property({
    type: 'string',
  })
  whoRaise?: string;

  @property({
    type: 'string',
  })
  whoAnswer?: string;

  @property({
    type: 'string',
  })
  specialRequest?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  airbusDecision?: string;

  @property({
    type: 'string',
  })
  ata?: string;

  @property({
    type: 'string',
  })
  customerPresentationItem?: string;

  @property({
    type: 'string',
  })
  category?: string;

  @property({
    type: 'string',
  })
  question?: string;

  @property({
    type: 'string',
  })
  answerOrAction?: string;

  @property({
    type: 'string',
  })
  reference?: string;

  @property({
    type: 'string',
  })
  blockMileStone?: string;

  @property({
    type: 'string',
  })
  originator?: string;


  constructor(data?: Partial<SpecificInfo>) {
    super(data);
  }
}
