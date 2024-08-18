import { Ipersonalcolegio } from "./iPersonalColegio";

export interface Iingresopersonal{
  id_ingresoPersonal:number,
  fecha: Date,
  hora_ingreso: string,
  hora_salida: string,
  numeroRegistro:number
  personal : Ipersonalcolegio

}
