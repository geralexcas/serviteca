import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DatosServicio,
  Cliente,
} from '../models';
import {DatosServicioRepository} from '../repositories';

export class DatosServicioClienteController {
  constructor(
    @repository(DatosServicioRepository)
    public datosServicioRepository: DatosServicioRepository,
  ) { }

  @get('/datos-servicios/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to DatosServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof DatosServicio.prototype.id,
  ): Promise<Cliente> {
    return this.datosServicioRepository.cliente(id);
  }
}
