import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {

  labels : any = [];
  customLabels: any;

  setDefaultLabels() {
    this.storage.get('labels').then((data) => {
      if (data == null || data.length == 0) {
        this.labels =  [
          {"id": 0 ,"name" : "Done","color" : "#32db64"},
          {"id": 1 ,"name" : "High priority","color" : "#f53d3d"},
          {"id": 2 ,"name" : "Priority","color" : "#ffce00"},
          {"id": 3 ,"name" : "Low priority","color" : "#7044ff"},
          {"id": 4 ,"name" : "Work","color" : "#3880ff"},
          {"id": 5 ,"name" : "Employee","color" : "#886aea"},
          {"id": 6 ,"name" : "Other","color" : "#989aa2"},
          {"id": 7 ,"name" : "Personal","color" : "#010101"},
        ];
        this.storage.set('labels',JSON.stringify(this.labels));
      } else {
        this.labels = JSON.parse(data);
      }
    });
  }
  
  constructor(public storage: Storage) {
    this.storage.ready().then(() => {
      this.setDefaultLabels();
    });
  }

  async getLabels() {
    return this.storage.ready().then(() => {
      return this.storage.get('labels').then((data) => {
        this.labels = JSON.parse(data);
        return JSON.parse(data);
      });
    });
  }

  getLabelColorById(id: number) {
    return this.labels[id].color;
  }

  getLabelNameById(id :number) {
    return this.labels[id].name;
  }

  setLabelName(id: number, name: string) {
    this.labels[id].name = name;
    this.storage.set('labels',JSON.stringify(this.labels));
  }
}
