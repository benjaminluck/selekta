import { Component } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>
              <nav>
            <a routerLink="/one" routerLinkActive="active">OneComponent</a>
            <a routerLink="/two" routerLinkActive="active">TwoComponent</a>
            </nav>
            <router-outlet></router-outlet>
  `,
})
export class AppComponent  { name = 'Angular'; }
