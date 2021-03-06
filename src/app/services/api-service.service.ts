import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {

  public headers: any;
  public token: string;
  public checkDatabase: any;
  public base_url: string = 'https://rails-angular2.herokuapp.com/';
  //public base_url: string = 'http://192.168.10.5:3000/';

  constructor(public http: Http, private localStorageService: LocalStorageService) {
    this.checkDatabase = this.localStorageService.get('data');
    if(this.checkDatabase != null){
     this.token = this.checkDatabase.access_token;
    }
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', "Token token=" + this.token);
  }



   login(data) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return  new Promise(resolve => {
       this.http
        .post(this.base_url + 'api/v1/users', JSON.stringify(data),
         { headers: headers }
         )
        .map(res => res.json())
        .subscribe( (data) => {
          resolve(data);
        }, (error) => {
          this.notAuthorized(error);
        });
     });
  }

   getBooks(user_id) {

    return new Promise(resolve => {
     this.http
        .get(this.base_url + 'api/v1/books?user_id=' + user_id,
          { headers: this.headers }
        )
        .map(res => res.json())
        .subscribe( (data) => {
          resolve(data);
        }, (error) => {
          this.notAuthorized(error);
        });
     });
  }

   addBook(data) {
     console.log(data);
    return  new Promise(resolve => {
     this.http
        .post(this.base_url + 'api/v1/books', JSON.stringify(data),
         { headers: this.headers }
         )
        .map(res => res.json())
        .subscribe( (data) => {
          resolve(data);
        }, (error) => {
          this.notAuthorized(error);
        });
     });
  }

   updateBook(data, book_id) {
     console.log(book_id);
    let stringyfy =  JSON.stringify(data);
    return  new Promise(resolve => {
     this.http
        .put(this.base_url + 'api/v1/books/' + book_id, JSON.stringify(data),
         { headers: this.headers }
         )
        .map(res => res.json())
        .subscribe( (data) => {
          resolve(data);
        }, (error) => {
          this.notAuthorized(error);
        });
     });
  }

  deleteBook(book_id){

    return new Promise(resolve => {
     this.http
        .delete(this.base_url + 'api/v1/books/' + book_id,
          { headers: this.headers }
        )
        .map(res => res.json())
        .subscribe( (data) => {
          resolve(data);
        }, (error) => {
          this.notAuthorized(error);
        });
     });
  }

  notAuthorized(error){
    if(error.status == '401'){
      this.localStorageService.clearAll();
      location.reload();
    }
  }

}
