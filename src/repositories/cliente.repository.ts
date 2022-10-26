import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ServitecaDataSource} from '../datasources';
import {Cliente, ClienteRelations, DatosServicio} from '../models';
import {DatosServicioRepository} from './datos-servicio.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly datosServicios: HasManyRepositoryFactory<DatosServicio, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.serviteca') dataSource: ServitecaDataSource, @repository.getter('DatosServicioRepository') protected datosServicioRepositoryGetter: Getter<DatosServicioRepository>,
  ) {
    super(Cliente, dataSource);
    this.datosServicios = this.createHasManyRepositoryFactoryFor('datosServicios', datosServicioRepositoryGetter,);
    this.registerInclusionResolver('datosServicios', this.datosServicios.inclusionResolver);
  }
}
