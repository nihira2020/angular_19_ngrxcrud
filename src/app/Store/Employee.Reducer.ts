import { createReducer, on } from "@ngrx/store";
import { employeeState } from "./Employee.State";
import { addEmployeeSuc, deleteEmployeeSuc, getEmployee, loadEmployeeFail, loadEmployeeSuc, updateEmployeeSuc } from "./Employee.Action";
import { state } from "@angular/animations";

const _employeeReducer = createReducer(employeeState,
    on(loadEmployeeSuc, (state, action) => {
        return {
            ...state,
            list: action.list,
            errormessage: ''
        }
    }),
    on(loadEmployeeFail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errMsg
        }
    }),
    on(deleteEmployeeSuc, (state, action) => {
        const _newdata = state.list.filter(o => o.id != action.empId)
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(addEmployeeSuc, (state, action) => {
        const _newdata = { ...action.data };
        return {
            ...state,
            list: [...state.list, _newdata],
            errormessage: ''
        }
    }),
    on(updateEmployeeSuc, (state, action) => {
        const _newdata = state.list.map(o => {
            return o.id === action.data.id ? action.data : o
        })
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(getEmployee, (state, action) => {
        let _newdata = state.list.find(o =>o.id===action.empId);
        if(_newdata==null){
            _newdata=state.empobj;
        }
        return {
            ...state,
            empobj:_newdata
        }
    })
);

export function employeeReducer(state: any, action: any) {
    return _employeeReducer(state, action);
}