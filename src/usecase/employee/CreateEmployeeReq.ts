import { Observable } from "rxjs"
import { EmployeeService } from "../../service/EmployeeService"
import { BaseResp } from "../../types/BaseResp"
import { CreateEmployeeReq } from "../../types/employee/CreateEmployeeReq"

export interface CreateEmployeeUseCase {
    execute(createEmployeeReq: CreateEmployeeReq): Observable<BaseResp>
}

export class CreateEmployeeUseCaseImpl implements CreateEmployeeUseCase {
    execute(createEmployeeReq: CreateEmployeeReq): Observable<BaseResp> {
        return new EmployeeService().create(createEmployeeReq)
    }

}