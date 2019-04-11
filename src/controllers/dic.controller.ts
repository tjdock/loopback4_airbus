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
import {Dic} from '../models';
import {DicRepository} from '../repositories';

export class DicController {
  constructor(
    @repository(DicRepository)
    public dicRepository : DicRepository,
  ) {}

  @post('/dics', {
    responses: {
      '200': {
        description: '添加字典',
        content: {'application/json': {schema: {'x-ts-type': Dic}}},
      },
    },
  })
  async create(@requestBody() dic: Dic): Promise<Dic> {
    return await this.dicRepository.create(dic);
  }

  @get('/dics/count', {
    responses: {
      '200': {
        description: '获取字典数量',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Dic)) where?: Where,
  ): Promise<Count> {
    return await this.dicRepository.count(where);
  }

  @get('/dics', {
    responses: {
      '200': {
        description: '获取所有字典',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Dic}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Dic)) filter?: Filter,
  ): Promise<Dic[]> {
    return await this.dicRepository.find(filter);
  }

  @patch('/dics', {
    responses: {
      '200': {
        description: '批量更新字典',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() dic: Dic,
    @param.query.object('where', getWhereSchemaFor(Dic)) where?: Where,
  ): Promise<Count> {
    return await this.dicRepository.updateAll(dic, where);
  }

  @get('/dics/{id}', {
    responses: {
      '200': {
        description: '根据ID获取字典',
        content: {'application/json': {schema: {'x-ts-type': Dic}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Dic> {
    return await this.dicRepository.findById(id);
  }

  @patch('/dics/{id}', {
    responses: {
      '204': {
        description: '根据ID更新字典（局部）',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() dic: Dic,
  ): Promise<void> {
    await this.dicRepository.updateById(id, dic);
  }

  @put('/dics/{id}', {
    responses: {
      '204': {
        description: '根据ID更新字典（全部）',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() dic: Dic,
  ): Promise<void> {
    await this.dicRepository.replaceById(id, dic);
  }

  @del('/dics/{id}', {
    responses: {
      '204': {
        description: '根据ID删除字典',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.dicRepository.deleteById(id);
  }
}
