import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EmployeeService } from "../service/employee.service";
import { addEmployee, addEmployeeSuc, deleteEmployee, deleteEmployeeSuc, emptyAction, loadEmployee, loadEmployeeFail, loadEmployeeSuc, updateEmployee, updateEmployeeSuc } from "./Employee.Action";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class empEffects {
    // constructor(private actions$: Actions, private service: EmployeeService) {

    // }

    actions$ = inject(Actions);
    service = inject(EmployeeService);
    toastr = inject(ToastrService)


    _loadEmployee = createEffect(() =>
        this.actions$.pipe(
            ofType(loadEmployee),
            exhaustMap(() => {
                return this.service.GetAll().pipe(
                    map((data) => {
                        return loadEmployeeSuc({ list: data })
                    }),
                    catchError((err) => of(loadEmployeeFail({ errMsg: err.message })))
                )
            })
        )
    )

    _deleteEmployee = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteEmployee),
            switchMap((action) => {
                return this.service.Delete(action.empId).pipe(
                    switchMap((data) => {
                        return of(deleteEmployeeSuc({ empId: action.empId }),
                        this.Showalert('Deleted Successfully.','pass')
                    )
                    }),
                    catchError((err) => of(this.Showalert(err.message,'fail')))
                )
            })
        )
    )

    _addEmployee = createEffect(() =>
        this.actions$.pipe(
            ofType(addEmployee),
            switchMap((action) => {
                return this.service.Create(action.data).pipe(
                    switchMap((data) => {
                        return of(addEmployeeSuc({ data: action.data }),
                        this.Showalert('Created Successfully.','pass')
                    )
                    }),
                    catchError((err) => of(this.Showalert(err.message,'fail')))
                )
            })
        )
    )

    _updateEmployee = createEffect(() =>
        this.actions$.pipe(
            ofType(updateEmployee),
            switchMap((action) => {
                return this.service.Update(action.data).pipe(
                    switchMap((data) => {
                        return of(updateEmployeeSuc({ data: action.data }),
                        this.Showalert('Updated Successfully.','pass')
                    )
                    }),
                    catchError((err) => of(this.Showalert(err.message,'fail')))
                )
            })
        )
    )

    Showalert(message: string, response: string) {
        if (response == 'pass') {
            this.toastr.success(message);
        }else{
            this.toastr.error(message);
        }
        return emptyAction();
    }

}