import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {OccurrenceStorage} from '../../app/provider/occurrence_storage';
import {
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapsMarker,
  GoogleMapsLatLng,
  GoogleMapsMarkerOptions,
  Geolocation
} from 'ionic-native';
import {TranslationProvider} from "../../app/provider/translation_provider";

@Component({
  selector: 'page-statistic',
  templateUrl: 'statistic.html'
})
export class StatisticPage {

  occurrences_storage: OccurrenceStorage;

  map: GoogleMap;

  constructor(public platform: Platform, occurrence_storage: OccurrenceStorage, public translation: TranslationProvider) {
    this.occurrences_storage = occurrence_storage;
    platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap() {
    Geolocation.getCurrentPosition().then((position) => {
      let location = new GoogleMapsLatLng(position.coords.latitude, position.coords.longitude);

      this.map = new GoogleMap('map', {
        'backgroundColor': 'white',
        'controls': {
          'compass': true,
          'myLocationButton': true,
          'indoorPicker': true,
          'zoom': true
        },
        'gestures': {
          'scroll': true,
          'tilt': true,
          'rotate': true,
          'zoom': true
        },
        'camera': {
          'latLng': location,
          'tilt': 30,
          'zoom': 15,
          'bearing': 50
        }
      });
      this.addMarkers();
    });
  }


  addMarkers() {
    let occurrences = this.occurrences_storage.all();

    for (let occurence of occurrences) {
      let location = new GoogleMapsLatLng(occurence.gps_coordinate.latitude, occurence.gps_coordinate.longitude);


      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        let markerOptions: GoogleMapsMarkerOptions = {
          position: location,
          title: occurence.symptom.name
        };

        this.map.addMarker(markerOptions)
          .then((marker: GoogleMapsMarker) => {
            marker.showInfoWindow();
          });
      });
    }


  }

}
