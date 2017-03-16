import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
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
  listShape : string;
  selectedTags : any[];

  constructor (public API : ApiService, public zone: NgZone, route: ActivatedRoute){
      let response : any[];
      this.listShape = "structured";
      this.selectedTags = [];
      if(route.snapshot.data[0]){
        this.listShape = route.snapshot.data[0].shapeData;
        console.log(this.listShape);
      }
      this.zone = zone;
      this.API.getList(this.listShape).subscribe(
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

  structureChanged(){
    let file = arguments[0];
    let structIndex = arguments[1];
    let struct = arguments[2];
    file.structure[structIndex] = struct;
    this.updateDoc(file);
    console.log(this.list);
  }

  documentAppendTag(doc: any[]){
    if(doc['newTag']){

      if(doc['tags']){
        doc['tags'].push(doc['newTag']);
      }else{
        doc['tags'] = [doc['newTag']];
      }

      delete doc['newTag'];
    };
    console.log(doc);
  }

  updateDoc(data: any[]){
    this.documentAppendTag(data);
    console.log(arguments);
    console.log(data);
    console.log(this.zone);
    this.API.updateDoc(data).subscribe(
        res => {
          console.log(res);
        },
        err => console.error(err),
        () => console.log('Completed!')
      );
  }

  selectTag(tagName: string){
    console.log(tagName);
    this.selectedTags.push(tagName);
    console.log(this.selectedTags);

    this.API.getListByTags(this.listShape, this.selectedTags).subscribe(
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

  }
}
