import {
    Count,
    CountSchema,
    Filter,
    repository,
    Where,
} from '@loopback/repository';
import {
    post,
    param,
    get,
    getFilterSchemaFor,
    getWhereSchemaFor,
    patch,
    put,
    del,
    requestBody,
} from '@loopback/rest';
import {SpecificInfo} from '../models';
import {GeneralInfoRepository, SpecificInfoRepository} from '../repositories';

export class SpecificInfoController {
    constructor(
        // @repository(SpecificInfoRepository)
        // public specificInfoRepository: SpecificInfoRepository,
        //新增
        @repository(GeneralInfoRepository)
        protected generalInfoRepository: GeneralInfoRepository
    ) {
    }

    // @post('/specific-infos', {
    //     responses: {
    //         '200': {
    //             description: 'SpecificInfo model instance',
    //             content: {'application/json': {schema: {'x-ts-type': SpecificInfo}}},
    //         },
    //     },
    // })
    // async create(@requestBody() specificInfo: SpecificInfo): Promise<SpecificInfo> {
    //     return await this.specificInfoRepository.create(specificInfo);
    // }
    //
    // @get('/specific-infos/count', {
    //     responses: {
    //         '200': {
    //             description: 'SpecificInfo model count',
    //             content: {'application/json': {schema: CountSchema}},
    //         },
    //     },
    // })
    // async count(
    //     @param.query.object('where', getWhereSchemaFor(SpecificInfo)) where?: Where,
    // ): Promise<Count> {
    //     return await this.specificInfoRepository.count(where);
    // }
    //
    // @get('/specific-infos', {
    //     responses: {
    //         '200': {
    //             description: 'Array of SpecificInfo model instances',
    //             content: {
    //                 'application/json': {
    //                     schema: {type: 'array', items: {'x-ts-type': SpecificInfo}},
    //                 },
    //             },
    //         },
    //     },
    // })
    // async find(
    //     @param.query.object('filter', getFilterSchemaFor(SpecificInfo)) filter?: Filter,
    // ): Promise<SpecificInfo[]> {
    //     return await this.specificInfoRepository.find(filter);
    // }
    //
    // @patch('/specific-infos', {
    //     responses: {
    //         '200': {
    //             description: 'SpecificInfo PATCH success count',
    //             content: {'application/json': {schema: CountSchema}},
    //         },
    //     },
    // })
    // async updateAll(
    //     @requestBody() specificInfo: SpecificInfo,
    //     @param.query.object('where', getWhereSchemaFor(SpecificInfo)) where?: Where,
    // ): Promise<Count> {
    //     return await this.specificInfoRepository.updateAll(specificInfo, where);
    // }
    //
    // @get('/specific-infos/{id}', {
    //     responses: {
    //         '200': {
    //             description: 'SpecificInfo model instance',
    //             content: {'application/json': {schema: {'x-ts-type': SpecificInfo}}},
    //         },
    //     },
    // })
    // async findById(@param.path.number('id') id: number): Promise<SpecificInfo> {
    //     return await this.specificInfoRepository.findById(id);
    // }
    //
    // @patch('/specific-infos/{id}', {
    //     responses: {
    //         '204': {
    //             description: 'SpecificInfo PATCH success',
    //         },
    //     },
    // })
    // async updateById(
    //     @param.path.number('id') id: number,
    //     @requestBody() specificInfo: SpecificInfo,
    // ): Promise<void> {
    //     await this.specificInfoRepository.updateById(id, specificInfo);
    // }
    //
    // @put('/specific-infos/{id}', {
    //     responses: {
    //         '204': {
    //             description: 'SpecificInfo PUT success',
    //         },
    //     },
    // })
    // async replaceById(
    //     @param.path.number('id') id: number,
    //     @requestBody() specificInfo: SpecificInfo,
    // ): Promise<void> {
    //     await this.specificInfoRepository.replaceById(id, specificInfo);
    // }
    //
    // @del('/specific-infos/{id}', {
    //     responses: {
    //         '204': {
    //             description: 'SpecificInfo DELETE success',
    //         },
    //     },
    // })
    // async deleteById(@param.path.number('id') id: number): Promise<void> {
    //     await this.specificInfoRepository.deleteById(id);
    // }

    //新增
    @post('/general-infos/{id}/specific-infos', {
        responses: {
            '200': {
                content: {'application/json': {schema: {'x-ts-type': SpecificInfo}}}
            }
        }
    })
    async create2(
        @param.path.number('id') id: number,
        @requestBody() specificInfo: SpecificInfo) {
        return await this.generalInfoRepository.specificInfos(id).create(specificInfo)
    }

    @get('/general-infos/{id}/specific-infos', {
        responses: {
            '200': {
                content: {
                    'application/json': {
                        schema: {type: 'array', items: {'x-ts-type': SpecificInfo}}
                    }
                }
            }
        }
    })
    async find2(
        @param.path.number('id') id: number,
        @param.query.object('filter') filter?: Filter,
    ): Promise<SpecificInfo[]> {
        return await this.generalInfoRepository.specificInfos(id).find(filter);
    }

    @patch('/general-infos/{id}/specific-infos', {
        responses: {
            '200': {
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async patch(
        @param.path.number('id') id: number,
        @requestBody() specificInfo: Partial<SpecificInfo>,
        @param.query.object('where', getWhereSchemaFor(SpecificInfo)) where?: Where,
    ): Promise<Count> {
        return await this.generalInfoRepository.specificInfos(id).patch(specificInfo, where);
    }

    @del('/general-infos/{id}/specific-infos', {
        responses: {
            '200': {
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async delete(
        @param.path.number('id') id: number,
        @param.query.object('where', getWhereSchemaFor(SpecificInfo)) where?: Where,
    ): Promise<Count> {
        return await this.generalInfoRepository.specificInfos(id).delete(where);
    }
}
