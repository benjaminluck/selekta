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
        this.selectedDocs = [];
        if (route.snapshot.data[0]) {
            this.listShape = route.snapshot.data[0].shapeData;
            console.log(this.listShape);
        }
        this.zone = zone;
        route.params.subscribe(function (params) {
            _this.currentSelection = params['selection'];
            if (params['structure']) {
                _this.listShape = params['structure'];
            }
            if (params['selection']) {
                _this.API.getListSelection(_this.currentSelection, _this.listShape).subscribe(function (res) {
                    console.log(res);
                    _this.list = [];
                    if (_this.listShape == 'structured') {
                        for (var key in res) {
                            _this.list = res[key];
                        }
                    }
                    else {
                        _this.list = res;
                    }
                    console.log(_this.currentSelection);
                }, function (err) { return console.error(err); }, function () { return console.log('Completed!'); });
            }
            else {
                _this.API.getVault().subscribe(function (res) {
                    console.log(res);
                    _this.list = [];
                    _this.listShape = 'unstructured';
                    _this.list = res;
                    console.log(_this.currentSelection);
                }, function (err) { return console.error(err); }, function () { return console.log('Completed!'); });
            }
        });
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
    ViewSelectionComponent.prototype.updDoc = function (data) {
        this.API.updateDoc(data).subscribe(function (res) {
            console.log(res);
        }, function (err) { return console.error(err); }, function () { return console.log('Completed!'); });
    };
    ViewSelectionComponent.prototype.clearSelection = function () {
        this.selectedDocs.forEach(function (item, key) {
            item.selected = false;
        });
        this.selectedDocs = [];
    };
    ViewSelectionComponent.prototype.bulkClearTag = function () {
        console.log(this);
        console.log('bulkClearTag');
        var self = this;
        this.selectedDocs.forEach(function (doc, key) {
            doc['tags'] = [];
            self.updDoc(doc);
        });
        console.log(this.list);
    };
    ViewSelectionComponent.prototype.bulkAddStruct = function () {
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
    ViewSelectionComponent.prototype.bulkClearStruct = function () {
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
    ViewSelectionComponent.prototype.bulkAddTag = function () {
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
    };
    ViewSelectionComponent.prototype.selectDocument = function (doc) {
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