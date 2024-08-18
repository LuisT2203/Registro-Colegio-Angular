import { Ipersonaexterna } from "./iPersonaExterna"

export interface IingresopersonaE{
  id_ingresoPersonaE:number,
  fecha: Date,
  hora_ingreso: string,
  hora_salida: string,
  asunto: string,
  numeroRegistro:number
  personaE : Ipersonaexterna

}
