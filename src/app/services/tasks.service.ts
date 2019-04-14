import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: any;

  constructor(public storage: Storage) { 
    this.getTasks().then((data) => {
      this.tasks = data;
    });
  }

  async getTasks() {
    return this.storage.get('tasks').then((data) => {
      return JSON.parse(data);
    });
  }

  async saveTasks(arr: any,p1 : number,p2 : number) {
    p1--;
    p2--;

    if (p1 >= 0 && p2 >= 0) {
      this.tasks = this.swapArray(arr,p1,p2);
      this.storage.set('tasks',JSON.stringify(this.tasks));
    }
  }

  async updateTaskStatus(task,name:string,status: string) {
    var index = this.tasks.findIndex(function(task, i){
      return task.name === name
    });

    this.tasks[index].status = status;
    this.storage.set('tasks',JSON.stringify(this.tasks));
  }

  async addTask(name: string,date: string) {
    var newTask = {"date" : date,"name" : name};
    this.tasks.push(newTask);
    this.storage.set('tasks',JSON.stringify(this.tasks));
  }

  swapArray(Array:any, p1:number, p2:number) : any
  {
      var temp = Array[p1];
      Array[p1] = Array[p2];
      Array[p2] = temp;
      return Array;
  }

}
