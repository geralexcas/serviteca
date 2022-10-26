import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ServitecaDataSource} from '../datasources';
import {Servicio, ServicioRelations, DatosServicio} from '../models';
import {DatosServicioRepository} from './datos-servicio.repository';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.id,
  ServicioRelations
> {

  public readonly datosServicio: BelongsToAccessor<DatosServicio, typeof Servicio.prototype.id>;

  constructor(
    @inject('datasources.serviteca') dataSource: ServitecaDataSource, @repository.getter('DatosServicioRepository') protected datosServicioRepositoryGetter: Getter<DatosServicioRepository>,
  ) {
    super(Servicio, dataSource);
    this.datosServicio = this.createBelongsToAccessorFor('datosServicio', datosServicioRepositoryGetter,);
    this.registerInclusionResolver('datosServicio', this.datosServicio.inclusionResolver);
  }
}
