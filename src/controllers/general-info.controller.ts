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
import {GeneralInfo} from '../models';
import {GeneralInfoRepository} from '../repositories';

export class GeneralInfoController {
  constructor(
    @repository(GeneralInfoRepository)
    public generalInfoRepository : GeneralInfoRepository,
  ) {}

  @post('/general-infos', {
    responses: {
      '200': {
        description: 'GeneralInfo model instance',
        content: {'application/json': {schema: {'x-ts-type': GeneralInfo}}},
      },
    },
  })
  async create(@requestBody() generalInfo: GeneralInfo): Promise<GeneralInfo> {
    return await this.generalInfoRepository.create(generalInfo);
  }

  @get('/general-infos/count', {
    responses: {
      '200': {
        description: 'GeneralInfo model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(GeneralInfo)) where?: Where,
  ): Promise<Count> {
    return await this.generalInfoRepository.count(where);
  }

  @get('/general-infos', {
    responses: {
      '200': {
        description: 'Array of GeneralInfo model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': GeneralInfo}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(GeneralInfo)) filter?: Filter,
  ): Promise<GeneralInfo[]> {
    return await this.generalInfoRepository.find(filter);
  }

  @patch('/general-infos', {
    responses: {
      '200': {
        description: 'GeneralInfo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() generalInfo: GeneralInfo,
    @param.query.object('where', getWhereSchemaFor(GeneralInfo)) where?: Where,
  ): Promise<Count> {
    return await this.generalInfoRepository.updateAll(generalInfo, where);
  }

  @get('/general-infos/{id}', {
    responses: {
      '200': {
        description: 'GeneralInfo model instance',
        content: {'application/json': {schema: {'x-ts-type': GeneralInfo}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<GeneralInfo> {
    return await this.generalInfoRepository.findById(id);
  }

  @patch('/general-infos/{id}', {
    responses: {
      '204': {
        description: 'GeneralInfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() generalInfo: GeneralInfo,
  ): Promise<void> {
    await this.generalInfoRepository.updateById(id, generalInfo);
  }

  @put('/general-infos/{id}', {
    responses: {
      '204': {
        description: 'GeneralInfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() generalInfo: GeneralInfo,
  ): Promise<void> {
    await this.generalInfoRepository.replaceById(id, generalInfo);
  }

  @del('/general-infos/{id}', {
    responses: {
      '204': {
        description: 'GeneralInfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.generalInfoRepository.deleteById(id);
  }
}
