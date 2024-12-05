import { createAction, props } from "@ngrx/store";
import { Employee } from "../model/Employee";

export const LOAD_EMPLOYEE = '[employee] getall'
export const LOAD_EMPLOYEE_SUCCESS = 'employee getall suc'
export const LOAD_EMPLOYEE_FAIL = 'employee getall fail'

export const DELETE_EMPLOYEE = '[employee] delete'
export const DELETE_EMPLOYEE_SUCC = '[employee] delete succ'

export const ADD_EMPLOYEE = '[employee] add'
export const ADD_EMPLOYEE_SUCC = '[employee] add succ'

export const UPDATE_EMPLOYEE = '[employee] update'
export const UPDATE_EMPLOYEE_SUCC = '[employee] update succ'

export const GET_EMPLOYEE = '[employee] get employee'


export const loadEmployee = createAction(LOAD_EMPLOYEE)
export const loadEmployeeSuc = createAction(LOAD_EMPLOYEE_SUCCESS, props<{ list: Employee[] }>())
export const loadEmployeeFail = createAction(LOAD_EMPLOYEE_FAIL, props<{ errMsg: string }>())

export const deleteEmployee = createAction(DELETE_EMPLOYEE,props<{empId:number}>())
export const deleteEmployeeSuc = createAction(DELETE_EMPLOYEE_SUCC, props<{ empId:number }>())

export const addEmployee = createAction(ADD_EMPLOYEE,props<{data:Employee}>())
export const addEmployeeSuc = createAction(ADD_EMPLOYEE_SUCC, props<{ data:Employee }>())

export const updateEmployee = createAction(UPDATE_EMPLOYEE,props<{data:Employee}>())
export const updateEmployeeSuc = createAction(UPDATE_EMPLOYEE_SUCC, props<{ data:Employee }>())

export const getEmployee = createAction(GET_EMPLOYEE,props<{empId:number}>())

export const emptyAction = createAction('empty')
