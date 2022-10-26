import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cliente,
  DatosServicio,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteDatosServicioController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/datos-servicios', {
    responses: {
      '200': {
        description: 'Array of Cliente has many DatosServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DatosServicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DatosServicio>,
  ): Promise<DatosServicio[]> {
    return this.clienteRepository.datosServicios(id).find(filter);
  }

  @post('/clientes/{id}/datos-servicios', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(DatosServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatosServicio, {
            title: 'NewDatosServicioInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) datosServicio: Omit<DatosServicio, 'id'>,
  ): Promise<DatosServicio> {
    return this.clienteRepository.datosServicios(id).create(datosServicio);
  }

  @patch('/clientes/{id}/datos-servicios', {
    responses: {
      '200': {
        description: 'Cliente.DatosServicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatosServicio, {partial: true}),
        },
      },
    })
    datosServicio: Partial<DatosServicio>,
    @param.query.object('where', getWhereSchemaFor(DatosServicio)) where?: Where<DatosServicio>,
  ): Promise<Count> {
    return this.clienteRepository.datosServicios(id).patch(datosServicio, where);
  }

  @del('/clientes/{id}/datos-servicios', {
    responses: {
      '200': {
        description: 'Cliente.DatosServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DatosServicio)) where?: Where<DatosServicio>,
  ): Promise<Count> {
    return this.clienteRepository.datosServicios(id).delete(where);
  }
}
