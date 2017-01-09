import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  template: `<h1>Hello to OneComponent : {{name}}</h1>`,
})
export class OneComponent  {
  constructor(
    private router: Router
  ){

  }
  name = 'Angular';
  ngOnInit(): void {
    console.log(this.router);
    var router = this.router;
    setTimeout(function() {
      console.log('going to twoComponent!');
      router.navigate(['/two']);
    }, 1000);
    console.log("bleep");
  }

}
