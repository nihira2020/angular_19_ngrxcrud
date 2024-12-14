import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, viewChild, viewChildren } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { ChildComponent } from './component/child/child.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatFormFieldModule, MatCardModule, MatInputModule,
    ChildComponent
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

  constructor(private cref: ChangeDetectorRef) {

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
