import 'node_modules/leaflet.tilelayer.colorfilter/src/leaflet-tilelayer-colorfilter.js';

import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { EG_PRODUCT, EgProduct } from '@eg/common/src/eg/injectors/eg-product';
import { StyleUtil } from '@eg/common/src/lib/ng/utils/style';

import * as L from 'leaflet';

export type ColorFilter = {
  colorFilter: (url: string, options: unknown) => L.TileLayer & ColorFilter;
};
export type TileLayerWithColorFilter = L.TileLayer & ColorFilter;

//export type TileLayerWithColorFilter = L.TileLayer & {colorFilter: (url: string, options: string|unknown[]) => L.TileLayer}

@Component({
  selector: 'seed-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public constructor(
    @Inject(EG_PRODUCT) private readonly egProduct: EgProduct,
    @Inject(DOCUMENT) private document: Document
  ) {
    StyleUtil.loadStyleBundle(document, 'leaflet', 'leaflet.css');
  }

  /**
   * Changes to leafletOptions are ignored after they are initially set. This is
   * because these options are passed into the map constructor, so they can't be
   * changed anyways. So, make sure the object exists before the map is created.
   * You'll want to create the object in ngOnInit or hide the map DOM element
   * with *ngIf until you can create the options object.
   */

  /**
   * 'grayscale:100%', 'invert:100%', 'blur:0px', 'brightness:120%',
   * 'contrast:130%', 'grayscale:20%', 'hue:290deg', 'opacity:100%',
   * 'invert:100%', 'saturate:300%', 'sepia:10%',
   */
  private oldFilter = ['grayscale:75%', 'invert:0%', 'brightness:95%'];

  public options = {
    layers: [
      ((L.tileLayer as unknown) as TileLayerWithColorFilter).colorFilter(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          attribution: `${this.egProduct?.brandName} ${this.egProduct?.productName}`,
          filter: this.oldFilter
        }
      )
    ],
    zoom: 8,
    center: L.latLng(46.879966, 14.726909)
  };

  public layersControl = {
    baseLayers: {
      'Open Street Map': L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 18, attribution: '...' }
      ),
      'Open Cycle Map': L.tileLayer(
        'https//{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
        { maxZoom: 18, attribution: '...' }
      )
    },
    overlays: {
      'Big Circle': L.circle([46.95, -122], { radius: 5000 }),
      'Big Square': L.polygon([
        [46.8, -121.55],
        [46.9, -121.55],
        [46.9, -121.7],
        [46.8, -121.7]
      ])
    }
  };

  public layers = [
    L.circle([46.95, -122], { radius: 5000 }),
    L.polygon([
      [46.8, -121.85],
      [46.92, -121.92],
      [46.87, -121.8]
    ]),
    L.marker([46.879966, -121.726909])
  ];

  public layer = L.circle([46.95, -122], { radius: 5000 });

  public showLayer = true;

  public ngOnInit(): void {
    void this.getMapCenter();
  }

  private getMapCenter(): Promise<L.LatLng | null> {
    // const geoloationService = navigator.geolocation;
    // if (geoloationService) {
    //   geoloationService.getCurrentPosition(
    //     (position: any) => {
    //       console.log('location', position);

    //       const coords = position?.coords;

    //       if (coords) {
    //         return { latitude: coords.latitude, longitude: coords.longitude };
    //       }
    //     },
    //     undefined,
    //     { enableHighAccuracy: false } as PositionOptions
    //   );
    // }
    return Promise.resolve(null);
  }
}
