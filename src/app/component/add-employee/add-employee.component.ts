import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../service/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { addEmployee, getEmployee, updateEmployee } from '../../Store/Employee.Action';
import { selectEmployee } from '../../Store/Employee.Selector';

@Component({
  selector: 'app-add-employee',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule,
    MatIconModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {

  title = 'Add Employee'
  dialodata: any;
  isEdit = false;

  // constructor(private service: EmployeeService, private ref: MatDialogRef<AddEmployeeComponent>,
  //   private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any
  // ) {

  // }

  constructor(private store: Store, private ref: MatDialogRef<AddEmployeeComponent>,
    private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }
  ngOnInit(): void {
    this.dialodata = this.data;
    if (this.dialodata.code > 0) {
      this.title = 'Edit Employee';
      this.isEdit = true;
      this.store.dispatch(getEmployee({ empId: this.dialodata.code }));
      this.store.select(selectEmployee).subscribe(item => {
        let _data = item;
        if (_data != null) {
          this.empForm.setValue({
            id: _data.id,
            name: _data.name,
            doj: _data.doj,
            role: _data.role,
            salary: _data.salary
          })
        }
      })
      // this.service.Get(this.dialodata.code).subscribe(item => {
      //   let _data = item;
      //   if (_data != null) {
      //     this.empForm.setValue({
      //       id: _data.id,
      //       name: _data.name,
      //       doj: _data.doj,
      //       role: _data.role,
      //       salary: _data.salary
      //     })
      //   }
      // })
    }
  }


  empForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    doj: new FormControl(new Date(), Validators.required),
    role: new FormControl('', Validators.required),
    salary: new FormControl(0, Validators.required)
  })

  SaveEmployee() {
    if (this.empForm.valid) {
      let _data: Employee = {
        id: this.empForm.value.id as number,
        name: this.empForm.value.name as string,
        doj: new Date(this.empForm.value.doj as Date),
        role: this.empForm.value.role as string,
        salary: this.empForm.value.salary as number,
      }

      if (!this.isEdit) {
        // this.service.Update(_data).subscribe(item => {
        //   this.toastr.success('Saved successfully', 'Updated');
        //   this.closepopup();
        // });
        this.store.dispatch(addEmployee({ data: _data }));
      } else {
        // this.service.Create(_data).subscribe(item => {
        //   this.toastr.success('Saved successfully', 'Created');
        //   this.closepopup();
        // });
        this.store.dispatch(updateEmployee({ data: _data }));
      }
      this.closepopup();

    }
  }

  closepopup() {
    this.ref.close();
  }

}
