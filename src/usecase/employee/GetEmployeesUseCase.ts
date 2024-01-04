import { Observable } from "rxjs"
import { EmployeeService } from "../../service/EmployeeService"
import { GetEmployeesResp } from "../../types/employee/GetEmployeesResp"

export interface GetEmployeesUseCase {
    execute(): Observable<GetEmployeesResp>
}

export class GetEmployeesUseCaseImpl implements GetEmployeesUseCase {
    execute(): Observable<GetEmployeesResp> {
        return new EmployeeService().getEmployees()
    }
}