import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {OccurrenceStorage} from '../../app/provider/occurrence_storage';

@Component({
  selector: 'page-occurrence',
  templateUrl: 'occurrence.html'
})
export class OccurrencePage {

  occurrences_storage: OccurrenceStorage;

  constructor(public navCtrl: NavController,  occurrence_storage: OccurrenceStorage) {
    this.occurrences_storage = occurrence_storage;
  }

}