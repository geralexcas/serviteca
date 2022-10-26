import {Entity, model, property} from '@loopback/repository';

@model()
export class Veiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  placa_carro: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  year: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;


  constructor(data?: Partial<Veiculo>) {
    super(data);
  }
}

export interface VeiculoRelations {
  // describe navigational properties here
}

export type VeiculoWithRelations = Veiculo & VeiculoRelations;
