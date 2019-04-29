import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {

  labels : any = [
    {"name" : "Done","color" : "#32db64"},
    {"name" : "High priority","color" : "#f53d3d"},
    {"name" : "Priority","color" : "#ffce00"},
    {"name" : "Low priority","color" : "#7044ff"},
    {"name" : "Work","color" : "#3880ff"}   
  ];

  customLabels: any;

  setDefaultLabels() {
    this.storage.set('labels',JSON.stringify(this.labels));
  }
  
  constructor(public storage: Storage) {
    this.storage.ready().then(() => {
      this.setDefaultLabels();
    });
  }

  async getLabels() {
    return this.storage.ready().then(() => {
      return this.storage.get('labels').then((data) => {
        return JSON.parse(data);
      });
    });
  }

  getLabelColorByName(name: string) {
    var color = null;
    
    this.labels.forEach( element => {
      if(element.name == name) {
        color = element.color;
      }
    });

    return color;
  }
}
