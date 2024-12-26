import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempchildComponent } from './tempchild.component';

describe('TempchildComponent', () => {
  let component: TempchildComponent;
  let fixture: ComponentFixture<TempchildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempchildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
