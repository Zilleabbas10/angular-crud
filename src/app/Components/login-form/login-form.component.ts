import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { ApiService } from '../../services/api-service.service';
import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent} from 'ngx-facebook';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent implements OnInit {

  public data: any;

  signInUser = {
    email: '',
    password: ''
  };

  constructor(private localStorageService: LocalStorageService, private apiservice: ApiService, private fb: FacebookService) {
    fb.init({
      appId: '377306262682113',
      version: 'v2.9'
    });

  }

  ngOnInit() {}


  loginWithFacebook(): void {

    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,user_friends,email,pages_show_list'
    };
 
    this.fb.login(loginOptions)
      .then((response: LoginResponse) => {
          console.log(response);
          this.getProfile(response);
        })
      .catch((error: any) => console.error(error));
 
  }

    getProfile(loginData) {
    this.fb.api('/me?fields=id,name,email')
      .then((res: any) => {
        console.log('Got the users profile', res);
        let data: any = {};
        data = {
          loginData: loginData,
          profileData: res
        }
        this.apiservice.login(data).then( (data) => {
          this.data = data;
        })
      })
      .catch((error: any) => console.error(error));
  }


  onSignInSubmit(){
    if(this.signInUser.email == "zille@gmail.com" && this.signInUser.password == "123456" ){
      this.localStorageService.set('loginCredentials', this.signInUser);
      location.reload();
      console.log(this.signInUser);
    }
  }

  // login(){
  //   this.apiservice.login().then( (data) => {
  //     this.data = data;
  //   })

  // }

}
