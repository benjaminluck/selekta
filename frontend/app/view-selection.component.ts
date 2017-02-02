import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { NgZone } from '@angular/core';

import { KeysPipe } from './keys.pipe';

@Component({
  selector: 'my-app',
  providers: [ApiService],
  templateUrl: 'app/view/ViewSelectionTpl.html'
})
export class ViewSelectionComponent  {
  list : any[];

  constructor (API : ApiService, public zone: NgZone){
      let response : any[];
      this.zone = zone;
      API.getList().subscribe(
          res => {
            console.log(res);
            this.list = [];
            this.list = res;
            // for(let key in res){
            //   let obj = {};
            //   this.list.push(res[key]);
            // }
          },
          err => console.error(err),
          () => console.log('Completed!')
        );
      console.log(response);
      let data = [2,3];

      console.log(this);

  }

  clickSong(){
    console.log(arguments);

    if(arguments[0].visible == undefined){
      arguments[0].visible = false;
    }

    arguments[0].visible = !arguments[0].visible;

  }
}
