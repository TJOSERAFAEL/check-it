import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TasksService } from '../services/tasks.service';
import { LabelsService } from '../services/labels.service';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.page.html',
  styleUrls: ['./newtask.page.scss'],
})
export class NewtaskPage implements OnInit {

  name: string;
  notes: string;
  labels: any;
  labelName: string;

  constructor(public modalController: ModalController,  private taskService: TasksService, private labelsService: LabelsService) { 
    this.labelsService.getLabels().then((data) => {
      this.labels = data;
    });
  }

  ngOnInit() {

  }

  close() {
    this.modalController.dismiss();
  }

  addTask() {
    var today = new Date();
    this.taskService.addTask(this.name,today.toString(),this.notes,this.labelName);
    this.close();
  }

}
