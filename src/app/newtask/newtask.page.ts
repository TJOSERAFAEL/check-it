import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TasksService } from '../services/tasks.service';
import { LabelsService } from '../services/labels.service';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.page.html',
  styleUrls: ['./newtask.page.scss'],
})
export class NewtaskPage implements OnInit {

  name: string;
  notes: string;
  labels: any;
  labelId: number;
  remind: any;
  hour: string;
  added: boolean;

  constructor(public modalController: ModalController,  private taskService: TasksService, private labelsService: LabelsService, public alertController: AlertController,  private _translate: TranslateService) { 
    this.labelsService.getLabels().then((data) => {
      this.labels = data;
    });

    this.remind = false;
    this.hour = null;
    this.added = false;
  }

  ngOnInit() {

  }

  close() {
    this.modalController.dismiss();
  }

  addTask() {
    var today = new Date();
    var hourMinutes = null;

    if( this.name == null || this.name.trim() == "") {
      this.presentAlert("Required","Field name is required");
      return;
    }

    if( this.hour ) {
      hourMinutes = this.hour.slice(this.hour.indexOf('T',0) + 1,this.hour.indexOf('T',0) + 6);
    }

    if (!this.added) {
      this.added = true;
      this.taskService.addTask(this.name, today.toDateString(), this.notes, this.labelId, hourMinutes).
      then( () => {
        this.close();
      }, () => {
        this.presentAlert("Error","Task is duplicated");
        this.added = false;
      });
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
