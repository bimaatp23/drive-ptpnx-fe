import { Observable } from "rxjs"
import { EmployeeService } from "../../service/EmployeeService"
import { BaseResp } from "../../types/BaseResp"
import { UpdateEmployeeReq } from "../../types/employee/UpdateEmployeeReq"

export interface UpdateEmployeeUseCase {
    execute(updateEmployeeReq: UpdateEmployeeReq): Observable<BaseResp>
}

export class UpdateEmployeeUseCaseImpl implements UpdateEmployeeUseCase {
    execute(updateEmployeeReq: UpdateEmployeeReq): Observable<BaseResp> {
        return new EmployeeService().update(updateEmployeeReq)
    }

}