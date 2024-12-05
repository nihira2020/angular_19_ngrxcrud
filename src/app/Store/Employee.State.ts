import { EmployeeModel } from "./Employee.Model";

export const employeeState:EmployeeModel={
    list: [],
    errormessage: "",
    empobj:{
        id: 0,
        name: "",
        doj: new Date(),
        role: "",
        salary: 0
    }
}