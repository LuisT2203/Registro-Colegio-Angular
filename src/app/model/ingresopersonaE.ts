import { Ipersonaexterna } from "./iPersonaExterna"
import { Personaexterna } from "./personaexterna"

export class IngresopersonaE{
  id_ingresoPersonaE:number=0
  fecha: Date = new Date;
  hora_ingreso: string=""
  hora_salida: string=""
  asunto: string=""
  numeroRegistro:number=0
  personaE : Ipersonaexterna = new Personaexterna();

}
