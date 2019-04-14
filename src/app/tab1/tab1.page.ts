import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  tasks: any;

  constructor(public storage: Storage,private taskService: TasksService) {
    this.taskService.getTasks().then((data) => {
      this.tasks = data;
    });
  }

  reorderTasks(ev) {
    console.log(`Moving item from ${ev.detail.from} to ${ev.detail.to}`);
    this.taskService.saveTasks(this.tasks,ev.detail.from,ev.detail.to);
    ev.detail.complete();
  }

  updateTask(task) {

    if (task.status === "true") {
      task.status = "false";
    } else {
      task.status = "true";
    }

    this.taskService.updateTaskStatus(task,task.name,task.status);
    console.log("Task update");
  }

}
