import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {GeneralInfo, SpecificInfo} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SpecificInfoRepository} from "./specific-info.repository";

export class GeneralInfoRepository extends DefaultCrudRepository<GeneralInfo,
    typeof GeneralInfo.prototype.id> {

    public readonly specificInfos: HasManyRepositoryFactory<SpecificInfo,
        typeof GeneralInfo.prototype.id>;

    constructor(
        @inject('datasources.db') dataSource: DbDataSource,
        @repository.getter(SpecificInfoRepository)
        protected specificInfoRepositoryGetter: Getter<SpecificInfoRepository>
    ) {
        super(GeneralInfo, dataSource);
        this.specificInfos = this.createHasManyRepositoryFactoryFor(
            'specificInfos',
            specificInfoRepositoryGetter);
    }
}
