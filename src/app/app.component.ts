import { AfterViewInit, ChangeDetectorRef, Component, effect, ElementRef, model, viewChild, viewChildren } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { ChildComponent } from './component/child/child.component';
import { TempchildComponent } from './component/tempchild/tempchild.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatFormFieldModule, MatCardModule, MatInputModule,
    ChildComponent,TempchildComponent,FormsModule,CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {

  //@ViewChild('name') nameElement!: ElementRef;
  // @ViewChild(ChildComponent) child!: ChildComponent;
  //@ViewChildren(ChildComponent) childs!: QueryList<ChildComponent>;

  // nameElement = viewChild.required<ElementRef>('name');
  // child = viewChild.required<ChildComponent>(ChildComponent);
  // childs = viewChildren(ChildComponent);
  
  readonly nameElement = viewChild.required<ElementRef>('name');
  readonly child = viewChild.required(ChildComponent);
  readonly childs = viewChildren(ChildComponent);

  //username='Test'
  username=model<string>('Test')
  userobj=model<{firstname:string,lastname:string}>({
    firstname: '',
    lastname: ''
  })

  constructor(private cref: ChangeDetectorRef) {
     effect(()=>{
      if(this.username().length>5){
        alert('Crossed more than 5 characters')
      }
     })
  }

  ngAfterViewInit(): void {
    // console.log(this.nameElement);
    // this.nameElement.nativeElement.focus();
    // this.nameElement.nativeElement.value = '200';
    // this.nameElement.nativeElement.disabled = 'disabled'

    // let _element = this.nameElement();
    // _element.nativeElement.focus();
    // _element.nativeElement.value = '300'
    // _element.nativeElement.disabled = 'diabled'

    this.nameElement().nativeElement.focus();
    const nameElement = this.nameElement();
    nameElement.nativeElement.value = '200';
    nameElement.nativeElement.disabled = 'disabled'

    //this.child.title = 'Child'
    //this.child().title = 'Child'
    this.child().title = 'Child'

    //console.log(this.childs.toArray())
    // this.childs.toArray().forEach((item, i) => {
    //   item.title = 'Child ' + i
    // })

    // this.childs().forEach((item, i) => {
    //   item.title = 'Child ' + i
    // })

    this.childs().forEach((item, i) => {
      item.title = 'Child ' + i
    })
    this.cref.detectChanges();
  }


}
