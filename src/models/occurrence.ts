import { isNullOrUndefined } from "util";
import { GPSCoordinates } from "./coordinate";
import { FactorInstance } from "./factor_instance";
import { SymptomWithFactor } from "./symptom_with_factors";


export class Occurrence {
  id: string;
  symptom: SymptomWithFactor;
  symptom_id: string;
  date: string;
  gps_coordinate: GPSCoordinates;
  factors: FactorInstance[];

  constructor(symptom: SymptomWithFactor,
              date: string, gps_location: GPSCoordinates,
              factors: FactorInstance[]) {
    this.symptom = symptom;
    this.date = date;
    this.gps_coordinate = gps_location;
    this.factors = factors;
    if (isNullOrUndefined(this.factors)) {
      this.factors = [];
    }
  }


  static convertObjectToInstance(object: any): Occurrence {
    let instance = new Occurrence(
      object.symptom ? SymptomWithFactor.convertObjectToInstance(object.symptom) : null,
      object.date,
      object.gps_coordinate ? object.gps_coordinate : null,
      object.factors ? object.factors : null);
    instance.id = object.id;
    instance.symptom_id = object.symptom_id;
    return instance;
  }

  static convertObjectsToInstancesArray(objects: any[]): Occurrence[] {
    let instances: Occurrence[] = [];
    for (let object of objects) {
      instances.push(Occurrence.convertObjectToInstance(object));
    }
    return instances;
  }
}
