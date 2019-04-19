import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {

  labels : any;
  
  constructor(public storage: Storage) { }
}
