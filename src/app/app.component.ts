import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

	public checkDatabase: any;

  constructor(public router: Router, private localStorageService: LocalStorageService){
  	this.checkDatabase = this.localStorageService.get('data');
		if(this.checkDatabase != null){
  			this.router.navigate(['/profile']);
  		}else{
  			this.router.navigate(['/home']);
  		}
   }

}
