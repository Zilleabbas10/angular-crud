import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthDialogComponent } from "../auth-dialog/auth-dialog.component";
import { Router } from "@angular/router";
import { LocalStorageService } from 'angular-2-local-storage';
import { ApiService } from '../../services/api-service.service';
import { FacebookService, LoginResponse, LoginOptions } from 'ngx-facebook';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  checkDatabase: any;
  loaded: boolean = false;
  public data: any;

  @ViewChild('authDialog') authDialog: AuthDialogComponent;


  constructor(private router:Router, private localStorageService: LocalStorageService, private apiservice: ApiService, private fb: FacebookService) {
   this.checkDatabase = this.localStorageService.get('data');
   if(this.checkDatabase != null ){
    if(this.checkDatabase.access_token != null){
      this.loaded = true;
     }else{
       this.loaded = false;
    }
  }

    fb.init({
      appId: '377306262682113',
      version: 'v2.9'
    });
  }

  ngOnInit(){}


  loginWithFacebook(): void {

    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,user_friends,email,pages_show_list'
    };
 
    this.fb.login(loginOptions)
      .then((response: LoginResponse) => {
          let loginData: any = {
          accessToken: response.authResponse.accessToken,
          expiryTime: response.authResponse.expiresIn,
          signedRequest: response.authResponse.signedRequest
          }
          this.getProfile(loginData);
        })
      .catch((error: any) => console.error(error));
 
  }

    getProfile(loginData) {
    this.fb.api('/me?fields=id,name,email')
      .then((res: any) => {
        console.log('Got the users profile', res);
        let profileData: any = {
          uid: res.id,
          email: res.email,
          name: res.name
        }
        console.log(profileData);
        let data: any = {
          user: loginData,
          profileData: profileData
        }
        this.apiservice.login(data).then( (res) => {
          this.data = res;
          console.log(this.data);
          if(this.data.resp_status == 200){
            this.localStorageService.set('data', this.data.data);
            location.reload();
          }
        },(error) => {
            console.log(error);
        });
      })
      .catch((error: any) => console.error(error));
  }

  logOut(){
    this.localStorageService.clearAll();
    location.reload();
  }

  presentAuthDialog(mode){
    this.authDialog.openDialog(mode);
  }

}
