import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ServitecaDataSource} from '../datasources';
import {Veiculo, VeiculoRelations, DatosServicio} from '../models';
import {DatosServicioRepository} from './datos-servicio.repository';

export class VeiculoRepository extends DefaultCrudRepository<
  Veiculo,
  typeof Veiculo.prototype.id,
  VeiculoRelations
> {

  public readonly datosServicios: HasManyRepositoryFactory<DatosServicio, typeof Veiculo.prototype.id>;

  constructor(
    @inject('datasources.serviteca') dataSource: ServitecaDataSource, @repository.getter('DatosServicioRepository') protected datosServicioRepositoryGetter: Getter<DatosServicioRepository>,
  ) {
    super(Veiculo, dataSource);
    this.datosServicios = this.createHasManyRepositoryFactoryFor('datosServicios', datosServicioRepositoryGetter,);
    this.registerInclusionResolver('datosServicios', this.datosServicios.inclusionResolver);
  }
}
