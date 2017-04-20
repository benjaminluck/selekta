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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var api_service_1 = require("./api.service");
var core_2 = require("@angular/core");
var ViewSelectionComponent = (function () {
    function ViewSelectionComponent(API, zone, route) {
        var _this = this;
        this.API = API;
        this.zone = zone;
        var response;
        this.listShape = "structured";
        this.selectedTags = [];
        if (route.snapshot.data[0]) {
            this.listShape = route.snapshot.data[0].shapeData;
            console.log(this.listShape);
        }
        this.zone = zone;
        this.API.getList(this.listShape).subscribe(function (res) {
            console.log(res);
            _this.list = [];
            if (_this.listShape == 'structured') {
                for (var key in res) {
                    _this.list = res[key];
                    _this.currentSelection = key;
                }
            }
            console.log(_this.currentSelection);
        }, function (err) { return console.error(err); }, function () { return console.log('Completed!'); });
        console.log(response);
        var data = [2, 3];
        console.log(this);
    }
    ViewSelectionComponent.prototype.buildStructuredList = function (listUnstructed) {
        var structured = {};
        for (var _i = 0, listUnstructed_1 = listUnstructed; _i < listUnstructed_1.length; _i++) {
            var item = listUnstructed_1[_i];
            if (item.hasOwnProperty('structure')) {
                for (var i = 0; i < item['structure'].length; i++) {
                    var structString = 'structured';
                    for (var a = 0; a < item['structure'].length; a++) {
                        var newString = structString + '[' + '"' + item['structure'][a] + '"' + ']';
                        var evalString = 'if(' + structString + '.hasOwnProperty("' + item['structure'][a] + '")){ } else { ' + newString + ' = {} }';
                        eval(evalString);
                        structString = structString + '[' + '"' + item['structure'][a] + '"' + ']';
                        console.log(structString);
                    }
                    var fileBuildString = structString + '[' + '"' + item.fileName + '"' + ']' + ' = ' + 'item' + ';';
                    eval(fileBuildString);
                }
            }
            console.log(item);
        }
        return structured;
    };
    ViewSelectionComponent.prototype.structureChanged = function () {
        var file = arguments[0];
        var structIndex = arguments[1];
        var struct = arguments[2];
        var selectionName = this.currentSelection;
        file.structure[selectionName][structIndex] = struct;
        this.updateDoc(file);
    };
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
    ViewSelectionComponent.prototype.selectTag = function (tagName) {
        var _this = this;
        console.log(tagName);
        this.selectedTags.push(tagName);
        console.log(this.selectedTags);
        this.API.getListByTags(this.listShape, this.selectedTags).subscribe(function (res) {
            console.log(res);
            _this.list = [];
            _this.list = res;
        }, function (err) { return console.error(err); }, function () { return console.log('Completed!'); });
    };
    return ViewSelectionComponent;
}());
ViewSelectionComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        providers: [api_service_1.ApiService],
        templateUrl: 'app/view/ViewSelectionTpl.html'
    }),
    __metadata("design:paramtypes", [api_service_1.ApiService, core_2.NgZone, router_1.ActivatedRoute])
], ViewSelectionComponent);
exports.ViewSelectionComponent = ViewSelectionComponent;
//# sourceMappingURL=view-selection.component.js.map