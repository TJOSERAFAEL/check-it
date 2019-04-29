import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TasksService } from '../services/tasks.service';
import { ModalController } from '@ionic/angular';
import { NewtaskPage } from '../newtask/newtask.page';
import { LabelsService } from '../services/labels.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  animations: [
    trigger('taskState', [
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate('350ms ease-out')
      ]),
      transition('* => void', [
        animate('700ms ease-in', style({ opacity: '0' }))
      ])
    ])
  ]
})
export class Tab1Page {
  tasks: any;

  constructor(public storage: Storage, public taskService: TasksService, public modalController: ModalController, private labelsService: LabelsService) {
    this.taskService.getTasksObservable().subscribe((data) => {
      this.tasks = data;
    });
  }

  reorderTasks(ev) {
    this.taskService.saveTasks(this.tasks, ev.detail.from, ev.detail.to);
    ev.detail.complete();
  }

  updateTask(task) {
    if (task.status === "true") {
      task.status = "false";
    } else {
      task.status = "true";
    }
    this.taskService.updateTaskStatus(task, task.name, task.status);
  }

  async presentTaskModal() {
    const modal = await this.modalController.create({
      component: NewtaskPage
    });
    return await modal.present();
  }

  deleteTask(index: number) {
    this.taskService.deleteTaskByIndex(index);
  }

  getLabelColor(labelId: number): string {
    var label = this.labelsService.getLabelColorById(labelId);
    return label;
  }

  getLabelName(labelId: number) {
    return this.labelsService.getLabelNameById(labelId);
  }

}
