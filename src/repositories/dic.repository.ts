import {DefaultCrudRepository} from '@loopback/repository';
import {Dic} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DicRepository extends DefaultCrudRepository<
  Dic,
  typeof Dic.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Dic, dataSource);
  }
}
