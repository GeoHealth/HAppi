import {Symptom} from './symptom';
import {isNullOrUndefined} from "util";
import {GPSCoordinates} from "./coordinate";
import {FactorInstance} from "./factor_instance";


export class Occurrence {
  id: string;
  symptom: Symptom;
  date: string;
  gps_location: GPSCoordinates;
  factors: FactorInstance[];
  // photos: Photo[];

  constructor(symptom: Symptom, date: string, gps_location: GPSCoordinates, factors: FactorInstance[]) {
    this.symptom = symptom;
    this.date = date;
    this.gps_location = gps_location;
    this.factors = factors;
    if (isNullOrUndefined(this.factors)){
      this.factors = [];
    }
  }


}
