import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Servicio,
  DatosServicio,
} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioDatosServicioController {
  constructor(
    @repository(ServicioRepository)
    public servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/datos-servicio', {
    responses: {
      '200': {
        description: 'DatosServicio belonging to Servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DatosServicio)},
          },
        },
      },
    },
  })
  async getDatosServicio(
    @param.path.string('id') id: typeof Servicio.prototype.id,
  ): Promise<DatosServicio> {
    return this.servicioRepository.datosServicio(id);
  }
}
