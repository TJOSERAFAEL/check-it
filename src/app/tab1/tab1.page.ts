import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TasksService } from '../services/tasks.service';
import { ModalController } from '@ionic/angular';
import { NewtaskPage } from '../newtask/newtask.page';
import { LabelsService } from '../services/labels.service';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(public storage: Storage, public taskService: TasksService, public modalController: ModalController, private labelsService: LabelsService, public toastController: ToastController, private _translate: TranslateService) {
    this.taskService.getTasksObservable().subscribe((data) => {
      this.tasks = data;
    });
    this.taskReminder();
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

  taskReminder() {
    setInterval(() => {
      if ( this.tasks ) {
        this.tasks.forEach( task => {
          if ( task.hour ) {
            var now = new Date();
            var hour: string;
            var minute: string;

            if (now.getHours() < 10) {
              hour = '0' + now.getHours();
            } else {
              hour = now.getHours() .toString();
            }

            if (now.getMinutes() < 10) {
              minute = '0' + now.getMinutes();
            } else {
              minute = now.getMinutes().toString();
            }

            var hourMinutes = hour + ':' + minute;
            
            /* Reminder toast */
            if((now.toDateString() == task.date) && (hourMinutes == task.hour)) {
              this.presentReminderToast(task.name);
            }
          }
        });
      }
    },60000);
  }

  async presentReminderToast(message: string) {
    const toast = await this.toastController.create({
      header: 'Reminder',
      message: message,
      position: 'top',
      buttons: [
        {
          side: 'end',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }

}
