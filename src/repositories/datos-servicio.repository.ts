import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ServitecaDataSource} from '../datasources';
import {DatosServicio, DatosServicioRelations, Servicio} from '../models';
import {ServicioRepository} from './servicio.repository';

export class DatosServicioRepository extends DefaultCrudRepository<
  DatosServicio,
  typeof DatosServicio.prototype.id,
  DatosServicioRelations
> {

  public readonly servicios: HasManyRepositoryFactory<Servicio, typeof DatosServicio.prototype.id>;

  constructor(
    @inject('datasources.serviteca') dataSource: ServitecaDataSource, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>,
  ) {
    super(DatosServicio, dataSource);
    this.servicios = this.createHasManyRepositoryFactoryFor('servicios', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
  }
}
