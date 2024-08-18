import { Ipersonalcolegio } from "./iPersonalColegio";
import { Ippff } from "./iPPFF";
import { Ppff } from "./ppff";

export class Ingresoppff{
  id_ingresoPPFF:number=0
  fecha: Date = new Date
  hora_ingreso: string=""
  hora_salida: string=""
  asunto: string=""
  numeroRegistro:number=0
  padre : Ippff = new Ppff();
}
