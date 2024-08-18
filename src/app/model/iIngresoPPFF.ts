import { Ipersonalcolegio } from "./iPersonalColegio";
import { Ippff } from "./iPPFF";

export interface Iingresoppff{
  id_ingresoPPFF:number,
  fecha: Date,
  hora_ingreso: string,
  hora_salida: string,
  asunto: string,
  numeroRegistro:number
  padre : Ippff
}
