import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ApiService } from '../../services/api-service.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ]),
    trigger('dialog1', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class PanelComponent implements OnInit {


@Input() resetForm: boolean;
private crudForm: FormGroup;
public loadFlash = false;
public showDialog = false;
public show = false;
public show1 = false;
public heading: string;
public data1: any;
public result: any;
public checkDatabase: any;
public user_id: number;
public book_id: number;
public data: any = [
    {
      name: "Zille",
      description: "He is a good boy",
      email: "zilleabbas10@gmail.com"
    },
    {
      name: "Farhan",
      description: "He is a average boy",
      email: "farhan80@gmail.com"
    },
    {
      name: "Fahad",
      description: "He is a excellent boy",
      email: "fahad1@gmail.com"
    },
    {
      name: "Gul",
      description: "He is a diyrt boy",
      email: "gulpartyde@gmail.com"
    }
];

  constructor(public formBuilder: FormBuilder, private apiservice: ApiService, private localStorageService: LocalStorageService) {
     this.checkDatabase = this.localStorageService.get('data');
     this.user_id = this.checkDatabase.id;
     this.getBooks();
   }

  ngOnInit() {
    this.crudForm = this.formBuilder.group({
      author: ['', [Validators.required]],
      book_name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  closeDeleteAlertDialog() {
    this.show = false;
  }

  closeAddUpdatedialog() {
    this.loadFlash = false
    this.show1 = false;
    this.crudForm.reset();
  }

  deleteItem(){
      this.apiservice.deleteBook(this.book_id).then( (res) => {
         let data: any = res;
         if(data.resp_status == 200){
           this.getBooks();
           this.show = false;
         }
      },(error) => {
      });
  }

  showDeleteDailog(book_id){
    this.book_id = book_id;
    this.show = true;
  }

  showAddUpdatedialog(modal, user, book_id){
    this.book_id = book_id;
    this.show1 = true;
    if(modal == "Update"){
      this.heading = modal;
      this.patchValues(user);
    }
    else{
      this.heading = modal;
    }
  }

  crudSubmitForm(){
    if(this.heading == "Add"){
      let add: any = {
        user_id: this.user_id,
        author: this.crudForm.value.author,
        book_name: this.crudForm.value.book_name,
        description: this.crudForm.value.description
      }
      this.apiservice.addBook(add).then( (res) => {
       this.data = res;
        if(this.data.resp_status == 200){
          this.loadFlash = true;
          this.crudForm.reset();
          this.getBooks();
       }
      },(error) => {
      });
    }else{
      let update: any = {
        user_id: this.user_id,
        author: this.crudForm.value.author,
        book_name: this.crudForm.value.book_name,
        description: this.crudForm.value.description
      }
      this.apiservice.updateBook(update, this.book_id).then( (res) => {
       this.data = res;
        if(this.data.resp_status == 200){
           this.getBooks();
          this.loadFlash = true;
          this.crudForm.reset();
       }
      },(error) => {
      });
    }
  }

    patchValues(data){
    this.crudForm.patchValue({
            author: data.author,
            description: data.description,
            book_name: data.book_name
        })
  }

  getBooks(){
     this.apiservice.getBooks(this.user_id).then( (res) => {
       let result: any = res;
       console.log(result);
       if(result.data == ''){
         this.data1 = [];
       }else{
         this.data1 = result.data;
       }

    },(error) => {
    });
  }

}
