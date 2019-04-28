import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LabelsService } from '../services/labels.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  labels: any;

  constructor(public storage: Storage,private labelService: LabelsService) {
    this.labelService.getLabels().then((data) => {
      this.labels = data;
    });
  }

}
