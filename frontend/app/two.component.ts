import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'my-app',
  providers: [ApiService],
  templateUrl: 'app/two.html'
})
export class TwoComponent  {
  name = 'Angular';
  list = '';
  test = '' ;

  constructor (API : ApiService){
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

}
