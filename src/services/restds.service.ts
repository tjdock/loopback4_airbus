import {getService,juggler} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {RestdsDataSource} from '../datasources';
import {Restds} from "../models";

export interface RestdsService {

  getTicketList(pageIndex:number):Promise<Restds>;
}

export class RestdsServiceProvider implements Provider<RestdsService> {
  constructor(
    // restds must match the name property in the datasource json file
    @inject('datasources.restds')
    protected dataSource: juggler.DataSource = new RestdsDataSource(),
  ) {}

  value(): Promise<RestdsService> {
    return getService(this.dataSource);
  }
}
