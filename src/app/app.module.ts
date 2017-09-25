import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';
import { LocalStorageModule } from 'angular-2-local-storage';
import { FacebookModule } from 'ngx-facebook';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PanelComponent } from './Components/panel/panel.component';
import { AddTaskComponent } from './Components/add-task/add-task.component';


import { ApiService } from './services/api-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    AuthDialogComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProfileComponent,
    PanelComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    MaterializeModule,
    FacebookModule.forRoot(),
    LocalStorageModule.withConfig({
        prefix: 'my-app',
        storageType: 'localStorage'
    })
  ],
  providers: [ApiService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
