import {Component} from '@angular/core';
import {OccurrenceStorage} from '../../app/provider/occurrence_storage';
import {TranslationProvider} from "../../app/provider/translation_provider";

@Component({
  selector: 'page-occurrence',
  templateUrl: 'occurrence.html'
})
export class OccurrencePage {

  occurrences_storage: OccurrenceStorage;

  constructor(occurrence_storage: OccurrenceStorage, public translation: TranslationProvider) {
    this.occurrences_storage = occurrence_storage;
  }

}
