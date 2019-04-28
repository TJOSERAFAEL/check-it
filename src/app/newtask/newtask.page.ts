import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.page.html',
  styleUrls: ['./newtask.page.scss'],
})
export class NewtaskPage implements OnInit {

  name: string;
  notes: string;
  labels: any;

  constructor(public modalController: ModalController,  private taskService: TasksService) { }

  ngOnInit() {

  }

  close() {
    this.modalController.dismiss();
  }

  addTask() {
    var today = new Date();
    this.taskService.addTask(this.name,today.toString(),this.notes);
    this.close();
  }

}
