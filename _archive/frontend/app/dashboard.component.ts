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
