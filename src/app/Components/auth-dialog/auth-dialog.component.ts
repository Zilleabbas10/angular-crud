import {Component, OnInit, Input, EventEmitter} from '@angular/core';
import {MaterializeAction} from "angular2-materialize";
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.sass']
})
export class AuthDialogComponent implements OnInit {

  @Input('auth-mode') authMode: any;
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(public router: Router) {

  }

/*  onLoginFormResult(e){
    console.log(e);
    if(e.signedIn)
      this.closeDialog();
    else{
      alert(e.err.json().errors[0])
    }
  }

  onRegisterFormResult(e){
    console.log(e);
    if(e.signedUp)
      this.closeDialog();
    else{
      alert(e.err.json().errors.full_messages[0])
    }
  }*/

close(){
  console.log("Zille");
}


  openDialog(mode){
    this.authMode = mode;
    this.modalActions.emit({action:"modal", params:['open']});
    console.log(this.modalActions);
  }

  closeDialog(){
    if(this.authMode == 'add'){
      console.log('yes');
      this.router.navigate(['/home']);
    }
    this.modalActions.emit({action:"modal", params:['close']});
    console.log(this.modalActions);
  }

  ngOnInit() {
  }

  isLoginMode(){return this.authMode == 'login'}
  isRegisterMode(){return this.authMode == 'register'}
  isAddMode(){return this.authMode == 'add'}


}
