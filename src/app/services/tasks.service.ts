import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: any;
  serviceObservable: any;

  constructor(public storage: Storage) { 
    this.getTasks().then((data) => {
      this.tasks = data;
      if ( this.tasks == null ) {
        this.tasks = [];
      }
    });

    this.serviceObservable = new Observable((observer) => {
      observer.next(this.tasks);
      setInterval(() => {
        observer.next(this.tasks);
      },1000);
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

  async addTask(name: string, date: string, notes: string, labelId: number, hour: string) {
    var newTask = {"date" : date,"name" : name, "notes": notes, "status" : 'false', "label" : labelId, "hour": hour};

    /* Search for repeated name */
    var found = 0;
    this.tasks.forEach(task => {
      if (task.name == name) {
        found = 1;
      }
    });

    if ( found ) {
      throw new Error('Name already exists');
    }
    
    this.tasks.push(newTask);
    this.storage.set('tasks',JSON.stringify(this.tasks));
  }

  async deleteTaskByIndex(index: number) {
    this.tasks.splice(index,1);
    this.storage.set('tasks',JSON.stringify(this.tasks));
  } 

  swapArray(Array:any, p1:number, p2:number) : any
  {
      var temp = Array[p1];
      Array[p1] = Array[p2];
      Array[p2] = temp;
      return Array;
  }

  public getTasksObservable(): Observable<any> {
    return this.serviceObservable;
  }

}
