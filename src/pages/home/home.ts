import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;
  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, private platform: Platform) {
    platform.ready().then(() => {
      this.loadMap();
    });
  }
  loadMap() {
    let elements: HTMLElement = document.getElementById('map');
    this.map = this.googleMaps.create(elements);

    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        alert('map is ready');
        this.map.animateCamera({
          target: {
            lat: 43.0741904,
            lng: -89.3809802
          },
          zoom: 17,
          tilt: 60,
          bearing: 140,
          duration: 5000
        });
        this.map.addMarker({
          title: 'ionic',
          icon: 'blue',
          animation: 'drop',
          position: {
            lat: 43.0741904,
            lng: -89.3809802
          }
        })
        .then(marker =>{
          marker.on(GoogleMapsEvent.MAP_CLICK)
          .subscribe(()=>{
            alert('Clicked');
          })
        })
      });
  }
}
