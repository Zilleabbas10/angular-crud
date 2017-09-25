import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

public checkDatabase: any;

  constructor(private router:Router, private localStorageService: LocalStorageService) {
  	  	this.checkDatabase = this.localStorageService.get('data');
  	  	console.log(this.checkDatabase);
  }

  logOut(){
    this.localStorageService.clearAll();
    location.reload();
    console.log("Logout");
  }

  ngOnInit() {
  }

}
