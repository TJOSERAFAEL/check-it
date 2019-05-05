import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  slot: string = "bottom";
  
  constructor( public platform: Platform ) {

    if (!this.platform.is('mobile')) {
      this.slot = "top";
    } else {
      this.slot = "top";
    }

    this.notifyMe();
  }

  notifyMe() {
    
    if (!("Notification" in window)) {
      alert("This browser does not support system notifications");
    }
  
    else if (Notification.permission === "granted") {
     // var notification = new Notification("Hi there!");
    }
  
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
       /* if (permission === "granted") {
          var notification = new Notification("Hi there!");
        } */
      });
    }
  }
}
