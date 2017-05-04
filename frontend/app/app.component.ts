import { Component } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { ApiService } from './api.service';

@Component({
  selector: 'my-app',
  providers: [ApiService],
  templateUrl: 'app/view/WrapperTpl.html'
})
export class AppComponent  {
  name = 'Angular';
  selections : any[];

  constructor(public API : ApiService){
    this.API.getSelections().subscribe(
      res => {
        console.log(res);
        this.selections = [];
        this.selections = res;
      },
      err => console.error(err),
      () => console.log('Completed!')
    );

  }
}
