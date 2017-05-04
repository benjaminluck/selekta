"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var api_service_1 = require('./api.service');
var core_2 = require('@angular/core');
var ViewVaultComponent = (function () {
    function ViewVaultComponent(API, zone, route) {
        var _this = this;
        this.API = API;
        this.zone = zone;
        var response;
        this.selectedTags = [];
        this.selectedDocs = [];
        this.zone = zone;
        this.API.getVault().subscribe(function (res) {
            console.log(res);
            _this.list = [];
            _this.list = res;
        }, function (err) { return console.error(err); }, function () { return console.log('Completed!'); });
        console.log(response);
        var data = [2, 3];
        console.log(this);
    }
    ViewVaultComponent.prototype.structureChanged = function () {
        var file = arguments[0];
        var structIndex = arguments[1];
        var struct = arguments[2];
        var selectionName = this.currentSelection;
        file.structure[selectionName][structIndex] = struct;
        this.updateDoc(file);
    };
    ViewVaultComponent.prototype.documentAppendTag = function (doc) {
        if (doc['newTag']) {
            if (doc['tags']) {
                doc['tags'].push(doc['newTag']);
            }
            else {
                doc['tags'] = [doc['newTag']];
            }
            delete doc['newTag'];
        }
        ;
        console.log(doc);
    };
    ViewVaultComponent.prototype.updateDoc = function (data) {
        this.documentAppendTag(data);
        console.log(arguments);
        console.log(data);
        console.log(this.zone);
        this.API.updateDoc(data).subscribe(function (res) {
            console.log(res);
        }, function (err) { return console.error(err); }, function () { return console.log('Completed!'); });
    };
    ViewVaultComponent.prototype.updDoc = function (data) {
        this.API.updateDoc(data).subscribe(function (res) {
            console.log(res);
        }, function (err) { return console.error(err); }, function () { return console.log('Completed!'); });
    };
    ViewVaultComponent.prototype.clearSelection = function () {
        this.selectedDocs.forEach(function (item, key) {
            item.selected = false;
        });
        this.selectedDocs = [];
    };
    ViewVaultComponent.prototype.bulkClearTag = function () {
        console.log(this);
        console.log('bulkClearTag');
        var self = this;
        this.selectedDocs.forEach(function (doc, key) {
            doc['tags'] = [];
            self.updDoc(doc);
        });
        console.log(this.list);
    };
    ViewVaultComponent.prototype.bulkAddStruct = function () {
        console.log(this);
        console.log('bulkAddStruct');
        var self = this;
        var newStructureName = self.newBulkStruct;
        console.log(newStructureName);
        if (newStructureName.length > 0) {
            this.selectedDocs.forEach(function (doc, key) {
                if (doc['structure']) {
                    for (var structureName in doc['structure']) {
                        var newStructObj = doc['structure'][structureName];
                        doc['structure'][newStructureName] = newStructObj;
                        break;
                    }
                }
                self.updDoc(doc);
            });
        }
        console.log(this.list);
    };
    ViewVaultComponent.prototype.bulkClearStruct = function () {
        console.log(this);
        console.log('bulkClearStruct');
        var self = this;
        this.selectedDocs.forEach(function (doc, key) {
            if (doc['structure']) {
                console.log(doc);
                doc['structure'] = {};
            }
            self.updDoc(doc);
        });
        console.log(this.list);
    };
    ViewVaultComponent.prototype.bulkAddTag = function () {
        console.log(this);
        console.log('bulkAddTag');
        var self = this;
        var tag = this.newBulkTag;
        this.selectedDocs.forEach(function (doc, key) {
            console.log(doc);
            if (tag.length > 0) {
                if (doc['tags']) {
                    doc['tags'].push(tag);
                    self.updDoc(doc);
                }
                else {
                    doc['tags'] = [];
                    doc['tags'].push(tag);
                    self.updDoc(doc);
                }
            }
        });
        console.log(this.list);
        //
    };
    ViewVaultComponent.prototype.selectDocument = function (doc) {
        console.log(this.selectedDocs);
        console.log(doc);
        doc['selected'] = true;
        var id = doc['id'];
        var inSelection = -1;
        this.selectedDocs.forEach(function (item, key) {
            if (item.id == id) {
                inSelection = key;
            }
        });
        if (inSelection > -1) {
            this.selectedDocs.splice(inSelection, 1);
        }
        else {
            this.selectedDocs.push(doc);
        }
    };
    ViewVaultComponent.prototype.selectTag = function (tagName) {
        var _this = this;
        console.log(tagName);
        this.selectedTags.push(tagName);
        console.log(this.selectedTags);
        this.API.getListByTags(this.listShape, this.selectedTags).subscribe(function (res) {
            console.log(res);
            _this.list = [];
            _this.list = res;
            // for(let key in res){
            //   let obj = {};
            //   this.list.push(res[key]);
            // }
        }, function (err) { return console.error(err); }, function () { return console.log('Completed!'); });
    };
    ViewVaultComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            providers: [api_service_1.ApiService],
            templateUrl: 'app/view/ViewVaultTpl.html'
        }), 
        __metadata('design:paramtypes', [api_service_1.ApiService, core_2.NgZone, router_1.ActivatedRoute])
    ], ViewVaultComponent);
    return ViewVaultComponent;
}());
exports.ViewVaultComponent = ViewVaultComponent;
//# sourceMappingURL=view-vault.component.js.map