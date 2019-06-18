import {
    param,
    get,
} from '@loopback/rest';
import {inject} from '@loopback/context';
import {RestdsService} from "../services";
import {Restds, Ticket} from "../models";


export class RestdsController {
    private totalPage: number;
    private ticket: Ticket[];

    constructor(
        @inject('services.RestdsService') protected restdsService: RestdsService
    ) {
    }

    @get('/getTicketList', {
        responses: {
            '200': {
                description: '',
                content: {
                    'application/json': {
                        schema: {'x-ts-type': Restds},
                    },
                },
            },
        },
    })
    async find(
        // @param.path.number('pageIndex') pageIndex: number
    ): Promise<Restds> {
        let a = await this.restdsService.getTicketList(1);
        this.totalPage = a.TotalPage;
        this.ticket = a.Ticket;

        for (let i: number = 2; i < a.TotalPage; i++) {
            if (i !== a.TotalPage) {
                console.log('循环了' + i + '遍');
                let b = await this.restdsService.getTicketList(i+1);
                this.ticket = [...this.ticket, ...b.Ticket];
            }
        }
        a.Ticket = this.ticket;

        return a;
    }

}
