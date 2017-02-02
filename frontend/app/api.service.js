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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var ApiService = (function () {
    function ApiService(http) {
        this.http = http;
        this.baseUrl = 'http://swapi.co/api';
        //   console.log('hey');
        // //  var res = this.http.get('http://localhost:8888/selekta/api/RunAPI.php/list/');
        // //  var res = http;
        //   console.log(Http);
        console.log(this);
        //   console.log(http);
        //   console.log(this.http);
    }
    ApiService.prototype.blee = function () {
        console.log('blee');
    };
    ApiService.prototype.getCreateList = function () {
        console.log("getList");
        return this.http.get('http://localhost:8888/selekta/api/RunAPI.php/create-list/')
            .map(function (response) { return response.json(); });
    };
    ApiService.prototype.updateDoc = function (data) {
        console.log("updateDoc");
        console.log(data);
        return this.http.post('http://localhost:8888/selekta/api/RunAPI.php/update-doc/', data)
            .map(function (response) { return response.json(); });
    };
    ApiService.prototype.getList = function () {
        console.log("getList");
        return this.http.get('http://localhost:8888/selekta/api/RunAPI.php/list/')
            .map(function (response) { return response.json(); });
    };
    ApiService.prototype.getTest = function () {
        console.log("getTest");
        return this.http.get('http://localhost:8888/selekta/api/RunAPI.php/test/');
        //      .map(response => response);
    };
    // constructor(){
    //   console.log('hey');
    // }
    // getAll(): Observable<Person[]>{
    //   let people$ = this.http
    //     .get(`${this.baseUrl}/people`, {headers: this.getHeaders()})
    //     .map(mapPersons)
    //     .catch(handleError);
    //     return people$;
    // }
    //
    // get(id: number): Observable<Person> {
    //   let person$ = this.http
    //     .get(`${this.baseUrl}/people/${id}`, {headers: this.getHeaders()})
    //     .map(mapPerson);
    //     return person$;
    // }
    //
    // save(person: Person) : Observable<Response>{
    //   // this won't actually work because the StarWars API doesn't
    //   // is read-only. But it would look like this:
    //   return this.http
    //     .put(`${this.baseUrl}/people/${person.id}`, JSON.stringify(person), {headers: this.getHeaders()});
    // }
    ApiService.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        return headers;
    };
    ApiService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map