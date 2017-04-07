import { SymptomsStorage } from "../../../app/provider/symptoms_storage";
import { SymptomWithFactor } from "../../../models/symptom_with_factors";
import { CrashlyticsMock } from "../../mocks";

describe('SymptomsStorage', () => {
  beforeEach(() => {
    this.symptomsStorage = new SymptomsStorage(new CrashlyticsMock() as any);
    this.keyValueStore = {};
    this.symptom_name1 = "Abdominal Pain";
    this.symptom_id1 = "1";
    this.symptom_name2 = "Abnormal Facial Expressions";
    this.symptom_id2 = "2";

    this.symptom1 = new SymptomWithFactor(this.symptom_name1);
    this.symptom1.id = this.symptom_id1;

    this.symptom2 = new SymptomWithFactor(this.symptom_name2);
    this.symptom2.id = this.symptom_id2;

    this.addSymptom = (symptom: SymptomWithFactor) => {
      this.symptomsStorage.add(symptom);
    };

    this.addFewSymptoms = () => {
      this.addSymptom(this.symptom1);
      this.addSymptom(this.symptom2);
    };

    spyOn(this.symptomsStorage.store, 'getItem').and.callFake((key) => {
      return new Promise((resolve, reject) => {
        resolve(this.keyValueStore[key]);
      });
    });
    spyOn(this.symptomsStorage.store, 'setItem').and.callFake((key, value) => {
      return new Promise((resolve, reject) => {
        resolve('');
      });
    });
    spyOn(this.symptomsStorage.store, 'clear').and.callFake(() => {
      this.keyValueStore = {};
    });
  });

  afterEach(() => {
    this.symptomsStorage = null;
    this.keyValueStore = null;
    this.symptom_name1 = null;
    this.symptom_id1 = null;
    this.symptom_name2 = null;
    this.symptom_id2 = null;
    this.symptom1 = null;
    this.symptom2 = null;
    this.addSymptom = null;
    this.addFewSymptoms = null;
  });

  it('starts with an empty database', () => {
    expect(this.symptomsStorage.size()).toEqual(0);
  });

  describe('#add', () => {
    it('stores a symptom', () => {
      expect(this.symptomsStorage.size()).toEqual(0);
      this.symptomsStorage.add(this.symptom1);
      expect(this.symptomsStorage.size()).toEqual(1);
    });

    it('refuses an object that is not a SymptomWithFactor by throwing a TypeError exception', () => {
      this.wrong_occurrence = {
        id: 'id',
        name: 'name',
        short_description: 'short',
        long_description: 'long',
        gender_filter: 'both',
        category: null,
        factors: null
      };
      expect(() => {
        this.symptomsStorage.add(this.wrong_occurrence);
      }).toThrowError(TypeError);
      expect(this.symptomsStorage.size()).toEqual(0);

      this.wrong_occurrence = null;
    });
  });

  describe('#findByName', () => {
    beforeEach(() => {
      this.addSymptom(this.symptom1);
    });

    it('finds a symptom by its name and returns it', () => {
      expect(this.symptomsStorage.findByName(this.symptom_name1)[0].name).toEqual(this.symptom_name1);
    });

    it('returns an instance of SymptomWithFactor', () => {
      this.symptom = this.symptomsStorage.findByName(this.symptom_name1)[0];
      expect(this.symptom instanceof SymptomWithFactor).toBeTruthy();

      this.symptom = null;
    });
  });

  describe('#size', () => {
    it('returns the number of symptoms stored', () => {
      expect(this.symptomsStorage.size()).toEqual(0);

      this.addSymptom(this.symptom1);
      expect(this.symptomsStorage.size()).toEqual(1);

      this.addSymptom(this.symptom2);
      expect(this.symptomsStorage.size()).toEqual(2);
    });
  });

  describe('#all', () => {
    it('reads all symptoms', () => {
      this.addFewSymptoms();
      this.symptoms = this.symptomsStorage.all();
      expect(this.symptoms.length).toEqual(2);
      expect(this.symptoms[0].name).toEqual(this.symptom_name1);

      this.symptoms = null;
    });
  });

  describe('#remove', () => {
    it('deletes an existing symptom', () => {
      this.addFewSymptoms();
      expect(this.symptomsStorage.size()).toEqual(2);

      this.symptoms = this.symptomsStorage.all();
      this.symptomsStorage.remove(this.symptoms[0]);
      expect(this.symptomsStorage.size()).toEqual(1);

      this.symptomsStorage.remove(this.symptoms[1]);
      expect(this.symptomsStorage.size()).toEqual(0);

      this.symptoms = null;
    });

    it('does nothing when the given symptom does not exist', () => {
      this.addSymptom(this.symptom1);
      expect(this.symptomsStorage.size()).toEqual(1);

      this.symptomsStorage.remove(this.symptom2);
      expect(this.symptomsStorage.size()).toEqual(1);
    });
  });
});
