import {DefaultCrudRepository, BelongsToAccessor, repository} from '@loopback/repository';
import {GeneralInfo, SpecificInfo} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {GeneralInfoRepository} from "./general-info.repository";

export class SpecificInfoRepository extends DefaultCrudRepository<SpecificInfo,
    typeof SpecificInfo.prototype.id> {

    //public readonly generalInfo: BelongsToAccessor<GeneralInfo, typeof SpecificInfo.prototype.ID>;

    constructor(
        @inject('datasources.db') dataSource: DbDataSource,
        //@repository.getter('GeneralInfoRepository') specificInfoRepositoryGetter: Getter<GeneralInfoRepository>
    ) {
        super(SpecificInfo, dataSource);
        //this.generalInfo = this.createBelongsToAccessorFor('generalInfo', specificInfoRepositoryGetter)
    }
}
