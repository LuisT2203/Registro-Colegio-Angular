import { Time } from "@angular/common";
import { PersonalColegio } from "./personalcolegio";
import { Ipersonalcolegio } from "./iPersonalColegio";

export class Ingresopersonal{
  id_ingresoPersonal:number=0
  fecha: Date= new Date();
  hora_ingreso: string = '00:00:00';
  hora_salida: string = '00:00:00';
  numeroRegistro:number=0
  personal : Ipersonalcolegio = new PersonalColegio();

}
