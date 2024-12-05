import { Employee } from "../model/Employee";

export interface EmployeeModel {
    list: Employee[],
    errormessage: string,
    empobj:Employee
}