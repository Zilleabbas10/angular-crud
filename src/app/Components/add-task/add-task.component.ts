import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  animations: [
    trigger('dialog', [
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
export class AddTaskComponent implements OnInit {

   public resetForm = false;
  @Input() closable = true;
  @Input() visible: boolean;
  @Input() heading: string;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() reset: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() headingChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }


  close() {
  	console.log(this.heading);
  	console.log(this.visible);
    this.visible = false;
    this.resetForm = true;
    this.visibleChange.emit(this.visible);
  	this.headingChange.emit(this.heading);
  	this.reset.emit(this.resetForm);
  }

}
