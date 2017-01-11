import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

import { KeysPipe } from './keys.pipe';

@Component({
  selector: 'my-app',
  providers: [ApiService],
  templateUrl: 'app/view/ViewSelectionTpl.html'
})
export class ViewSelectionComponent  {
  list : any[];


  constructor (API : ApiService){
      let response : any[];
      API.getList().subscribe(
          res => {
            console.log(res);
            this.list = [];
            for(let key in res){
              this.list.push(res[key]);
            }
          },
          err => console.error(err),
          () => console.log('Completed!')
        );
      console.log(response);


      console.log(this);

  }
}
