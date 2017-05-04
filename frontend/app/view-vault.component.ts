import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { ApiService } from './api.service';
import { NgZone } from '@angular/core';

import { KeysPipe } from './keys.pipe';

@Component({
  selector: 'my-app',
  providers: [ApiService],
  templateUrl: 'app/view/ViewVaultTpl.html' 
})
export class ViewVaultComponent {
  list : any[];
  listShape : string;
  selectedTags : any[];
  currentSelection: string;
  selectedDocs : any[];
  newBulkTag: string;
  newBulkStruct: string;

  constructor (public API : ApiService, public zone: NgZone, route: ActivatedRoute){
      let response : any[];

      this.selectedTags = [];
      this.selectedDocs = [];

      this.zone = zone;

      this.API.getVault().subscribe(
            res => {
              console.log(res);
              this.list = [];
              this.list = res;
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
    let selectionName = this.currentSelection;
    file.structure[selectionName][structIndex] = struct;
    this.updateDoc(file);
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

  updateDoc(data: any[]){ // todo: refactor into append and update functions instead of one that does both
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

  updDoc(data: any[]){ // todo: refactor this and function above
    this.API.updateDoc(data).subscribe(
        res => {
          console.log(res);
        },
        err => console.error(err),
        () => console.log('Completed!')
      );
  }

  clearSelection(){
    this.selectedDocs.forEach(function(item, key){
      item.selected = false;
    })
    this.selectedDocs = [];
  }

  bulkClearTag(){
    console.log(this);
    console.log('bulkClearTag');
    var self = this;
    this.selectedDocs.forEach(function(doc,key){
      doc['tags'] = [];
      self.updDoc(doc);
    });
    console.log(this.list);
  }

  bulkAddStruct(){
    console.log(this);
    console.log('bulkAddStruct');
    var self = this;
    var newStructureName = self.newBulkStruct;
    console.log(newStructureName);
    if(newStructureName.length > 0){
      this.selectedDocs.forEach(function(doc,key){
        if(doc['structure']){
          for(let structureName in doc['structure']){
              let newStructObj = doc['structure'][structureName];
              doc['structure'][newStructureName] = newStructObj;
              break;
          }
        }
        self.updDoc(doc);
      });
    }
    console.log(this.list);
  }

  bulkClearStruct(){
    console.log(this);
    console.log('bulkClearStruct');
    var self = this;
    this.selectedDocs.forEach(function(doc,key){
      if(doc['structure']){
        console.log(doc);
        doc['structure'] = {};
      }
      self.updDoc(doc);
    });

    console.log(this.list);
  }


  bulkAddTag(){
    console.log(this);
    console.log('bulkAddTag');
    var self = this;
    let tag = this.newBulkTag;
    this.selectedDocs.forEach(function(doc,key){
        console.log(doc);
        if(tag.length > 0){
          if(doc['tags']){
              doc['tags'].push(tag);
              self.updDoc(doc);
          }
          else{
            doc['tags'] = [];
            doc['tags'].push(tag);
            self.updDoc(doc);
          }
        }
    });
    console.log(this.list);
    //
  }

  selectDocument(doc: any[]){
    console.log(this.selectedDocs);
    console.log(doc);
    doc['selected'] = true;
    let id = doc['id'];
    var inSelection = -1;
    this.selectedDocs.forEach(function(item, key){
      if(item.id == id){
        inSelection = key;
      }
    });
    if(inSelection > -1){
      this.selectedDocs.splice(inSelection, 1);
    }else{
      this.selectedDocs.push(doc);
    }
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
