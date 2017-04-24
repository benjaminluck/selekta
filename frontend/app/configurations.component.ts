import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'my-app',
  providers: [ApiService],
  templateUrl: 'app/view/ConfigurationsTpl.html'
})
export class ConfigurationsComponent  {
  name = 'Angular';
  list = '';
  test = '' ;
  parameters : string;

  constructor (public API : ApiService){
    API.getParams().subscribe(
        res => { console.log(res); this.parameters = res; },
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
