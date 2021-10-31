import { PatientsInterface } from "./IPatient";
import { LevelsInterface } from "./ILevel";
import { CharacteristicsInterface } from "./ICharacteristic";
import { UsersInterface } from "./IUser";

export interface CasesInterface {
  ID: number,
  CaseTime: Date,
  Address: string,

  CharacteristicID: number,
  Characteristic: CharacteristicsInterface,

  PatientID: number,
  Patient: PatientsInterface,

  LevelID: number,
  Level: LevelsInterface,

  InformerID : number ,
  Informer: UsersInterface,
}
