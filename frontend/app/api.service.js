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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var ApiService = (function () {
    function ApiService(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:8888/selekta/api/RunAPI.php/';
        console.log(this);
    }
    ApiService.prototype.blee = function () {
        console.log('blee');
    };
    ApiService.prototype.getParams = function () {
        console.log("getParams");
        return this.http.get('http://localhost:8888/selekta/api/RunAPI.php/params/')
            .map(function (response) { return response.json(); });
    };
    ApiService.prototype.getCreateList = function () {
        console.log("getList");
        return this.http.get('http://localhost:8888/selekta/api/RunAPI.php/create-list/')
            .map(function (response) { return response.json(); });
    };
    ApiService.prototype.createVault = function () {
        console.log("createVault");
        var params = {};
        return this.http.post(this.baseUrl + 'create-vault/', params)
            .map(function (response) { return response.json(); });
    };
    ApiService.prototype.updateDoc = function (data) {
        console.log("updateDoc");
        console.log(data);
        return this.http.put('http://localhost:8888/selekta/api/RunAPI.php/update-doc/', data)
            .map(function (response) { return response.json(); });
    };
    ApiService.prototype.getList = function (listShape) {
        console.log("getList");
        console.log("listShape");
        var endpoint = 'http://localhost:8888/selekta/api/RunAPI.php/list/';
        return this.http.get(endpoint + listShape)
            .map(function (response) { return response.json(); });
    };
    ApiService.prototype.getListByTags = function (listShape, tags) {
        console.log("getList");
        console.log("listShape");
        var endpoint = 'http://localhost:8888/selekta/api/RunAPI.php/list/';
        return this.http.get(endpoint + listShape + '/' + tags[0])
            .map(function (response) { return response.json(); });
    };
    ApiService.prototype.getTest = function () {
        console.log("getTest");
        return this.http.get('http://localhost:8888/selekta/api/RunAPI.php/test/');
    };
    ApiService.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        return headers;
    };
    return ApiService;
}());
ApiService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map