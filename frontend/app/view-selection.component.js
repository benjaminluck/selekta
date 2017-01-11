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
var api_service_1 = require("./api.service");
var ViewSelectionComponent = (function () {
    function ViewSelectionComponent(API) {
        var _this = this;
        var response;
        API.getList().subscribe(function (res) {
            console.log(res);
            _this.list = [];
            for (var key in res) {
                _this.list.push(res[key]);
            }
        }, function (err) { return console.error(err); }, function () { return console.log('Completed!'); });
        console.log(response);
        console.log(this);
    }
    return ViewSelectionComponent;
}());
ViewSelectionComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        providers: [api_service_1.ApiService],
        templateUrl: 'app/view/ViewSelectionTpl.html'
    }),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], ViewSelectionComponent);
exports.ViewSelectionComponent = ViewSelectionComponent;
//# sourceMappingURL=view-selection.component.js.map