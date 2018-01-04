import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService{
  private baseUrl: string = 'http://localhost:8888/selekta/api/RunAPI.php/';

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

  getParams() {
    console.log("getParams");
    return this.http.get('http://localhost:8888/selekta/api/RunAPI.php/params/')
      .map(response => response.json());
  }

  getCreateList() {
    console.log("getList");
    return this.http.get('http://localhost:8888/selekta/api/RunAPI.php/create-list/')
      .map(response => response.json());
  }

  // Update a comment
    // updateComment (body: Object): Observable<Comment[]> {
    //     let bodyString = JSON.stringify(body); // Stringify payload
    //     let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    //     let options       = new RequestOptions({ headers: headers }); // Create a request option
    //
    //     return this.http.put(`${this.commentsUrl}/${body['id']}`, body, options) // ...using put request
    //                      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    //                      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    // }

  createVault(){
    console.log("createVault");
    let params = {};
    return this.http.post(this.baseUrl + 'create-vault/', params)
      .map(response => response.json());
  }

  writeTodo(selection: string, shape: string){
    console.log("write todo list");
    let params = {};
    return this.http.post(this.baseUrl + 'write-todo/' + selection + '/' + shape + '/', params)
      .map(response => response.json());
  }

  updateDoc(data: any[]){
    console.log("updateDoc");
    console.log(data);
    return this.http.put('http://localhost:8888/selekta/api/RunAPI.php/update-doc/', data)
      .map(response => response.json());
  }

  getList(listShape: string) {
    console.log("getList");
    console.log("listShape");
    let endpoint = 'http://localhost:8888/selekta/api/RunAPI.php/list/'
    return this.http.get(endpoint + listShape)
      .map(response => response.json());
  }

  getVault() {
    console.log("getVault");
    console.log("listShape");
    let endpoint = 'http://localhost:8888/selekta/api/RunAPI.php/vault/'
    return this.http.get(endpoint)
      .map(response => response.json());
  }

  getSelections() {
    console.log("getSelections");
    let endpoint = 'http://localhost:8888/selekta/api/RunAPI.php/list-selections/'
    return this.http.get(endpoint) 
      .map(response => response.json());
  }

  getListSelection(selection: string, listShape: string) {
    console.log("getList");
    console.log("listShape");
    let endpoint = 'http://localhost:8888/selekta/api/RunAPI.php/list/'
    return this.http.get(endpoint + selection + '/' + listShape)
      .map(response => response.json());
  }

  getListByTags(listShape: string, tags: any[]) {
    console.log("getList");
    console.log("listShape");
    let endpoint = 'http://localhost:8888/selekta/api/RunAPI.php/list/'
    return this.http.get(endpoint + listShape + '/' + tags[0])
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
