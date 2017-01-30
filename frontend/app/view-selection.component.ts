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


      console.log(this);

  }

  selectItem(){
    let path0 = arguments[0].key;
    let path1 = arguments[1].key;
    let path2 = arguments[2].key;

    console.log(arguments);
    console.log(this);
    console.log(this.list[path0][path1][path2]);
    console.log(this.zone);
  //  delete this.list[path0][path1][path2];
  }
}
