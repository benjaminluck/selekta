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
var api_service_1 = require('./api.service');
var core_2 = require('@angular/core');
var ViewSelectionComponent = (function () {
    function ViewSelectionComponent(API, zone) {
        var _this = this;
        this.API = API;
        this.zone = zone;
        var response;
        this.zone = zone;
        this.API.getList().subscribe(function (res) {
            console.log(res);
            _this.list = [];
            _this.list = res;
            // for(let key in res){
            //   let obj = {};
            //   this.list.push(res[key]);
            // }
        }, function (err) { return console.error(err); }, function () { return console.log('Completed!'); });
        console.log(response);
        var data = [2, 3];
        console.log(this);
    }
    ViewSelectionComponent.prototype.documentAppendTag = function (doc) {
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
    ViewSelectionComponent.prototype.updateDoc = function (data) {
        this.documentAppendTag(data);
        console.log(arguments);
        console.log(data);
        console.log(this.zone);
        this.API.updateDoc(data).subscribe(function (res) {
            console.log(res);
        }, function (err) { return console.error(err); }, function () { return console.log('Completed!'); });
    };
    ViewSelectionComponent.prototype.clickSong = function () {
        console.log(arguments);
        if (arguments[0].visible == undefined) {
            arguments[0].visible = false;
        }
        arguments[0].visible = !arguments[0].visible;
    };
    ViewSelectionComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            providers: [api_service_1.ApiService],
            templateUrl: 'app/view/ViewSelectionTpl.html'
        }), 
        __metadata('design:paramtypes', [api_service_1.ApiService, core_2.NgZone])
    ], ViewSelectionComponent);
    return ViewSelectionComponent;
}());
exports.ViewSelectionComponent = ViewSelectionComponent;
//# sourceMappingURL=view-selection.component.js.map