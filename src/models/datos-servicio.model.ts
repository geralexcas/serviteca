import {Entity, model, property} from '@loopback/repository';

@model()
export class DatosServicio extends Entity {
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
  codigo_servicio: string;

  @property({
    type: 'string',
    required: true,
  })
  identificacion_cliente: string;

  @property({
    type: 'string',
    required: true,
  })
  placa_carro: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha_servicio: string;

  @property({
    type: 'string',
    required: true,
  })
  valor_servicio: string;


  constructor(data?: Partial<DatosServicio>) {
    super(data);
  }
}

export interface DatosServicioRelations {
  // describe navigational properties here
}

export type DatosServicioWithRelations = DatosServicio & DatosServicioRelations;
