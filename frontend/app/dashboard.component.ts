import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'my-app',
  providers: [ApiService],
  templateUrl: 'app/view/DashboardTpl.html'
})
export class DashboardComponent  {
  name = 'Angular';
  list = '';
  test = '' ;

  constructor (public API : ApiService){
    API.getList().subscribe(
        res => { console.log(res); this.list = res; },
        err => console.error(err),
        () => console.log('Completed!')
      );

      API.getTest().subscribe(
          res => { console.log(res); this.test = res['_body']; },
          err => console.error(err),
          () => console.log('Completed!')
        );

      console.log(this);

  }

  createVault(){
    this.API.createVault().subscribe(
        res => {
          console.log(res);
        },
        err => console.error(err),
        () => console.log('Completed!')
      );
  }

}
