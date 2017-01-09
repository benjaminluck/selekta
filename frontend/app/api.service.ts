import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService{
  private baseUrl: string = 'http://swapi.co/api';

  constructor(private http : Http){
  //   console.log('hey');
  // //  var res = this.http.get('http://localhost:8888/selekta/api/RunAPI.php/list/');
  // //  var res = http;
  //   console.log(Http);
     console.log(this);
  //   console.log(http);
  //   console.log(this.http);
  }

  blee(){
    console.log('blee');
  }

  getList() {
    console.log("getList");
    return this.http.get('http://localhost:8888/selekta/api/RunAPI.php/list/')
      .map(response => response.json());
  }

  getTest() {
    console.log("getTest");
    return this.http.get('http://localhost:8888/selekta/api/RunAPI.php/test/')
//      .map(response => response);
  }


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

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}
