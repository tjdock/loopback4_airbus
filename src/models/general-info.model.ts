import {Entity, model, property, hasMany} from '@loopback/repository';
import {SpecificInfo} from "./specific-info.model";

@model()
export class GeneralInfo extends Entity {
    @property({
        type: 'number',
        id: true,
    })
    id?: number;

    @property({
        type: 'number',
    })
    msn: number;

    @property({
        type: 'string',
    })
    program?: string;

    @property({
        type: 'string',
    })
    deliveryStatus?: string;

    @property({
        type: 'string',
    })
    fleetInfo?: string;

    @property({
        type: 'string',
    })
    customerOwner?: string;

    @property({
        type: 'string',
    })
    customerOperator?: string;

    @property({
        type: 'string',
    })
    customerAuthority?: string;

    @property({
        type: 'string',
    })
    customerBranch?: string;

    @property({
        type: 'date',
    })
    cgcNotified?: string;

    @property({
        type: 'date',
    })
    cafNotified?: string;

    @property({
        type: 'date',
    })
    tacNotified?: string;

    @property({
        type: 'date',
    })
    totNotified?: string;

    @property({
        type: 'date',
    })
    cgcActual?: string;

    @property({
        type: 'date',
    })
    cafActual?: string;

    @property({
        type: 'date',
    })
    tacActual?: string;

    @property({
        type: 'date',
    })
    totActual?: string;

    @property({
        type: 'string',
    })
    delCADM?: string;

    @property({
        type: 'string',
    })
    delCIM?: string;

    @property({
        type: 'string',
    })
    delFTE?: string;

    @property({
        type: 'string',
    })
    delGTE?: string;

    @property({
        type: 'string',
    })
    delCM?: string;

    @property({
        type: 'string',
    })
    delIACE?: string;

    @property({
        type: 'string',
    })
    delADQM?: string;

    @property({
        type: 'string',
    })
    delDTM?: string;

    @property({
        type: 'string',
    })
    delSCM?: string;

    @property({
        type: 'string',
    })
    delFFM?: string;

    @hasMany(() => SpecificInfo)
    @property.array(SpecificInfo)
    specificInfos?: SpecificInfo[];

    constructor(data?: Partial<GeneralInfo>) {
        super(data);
    }
}
