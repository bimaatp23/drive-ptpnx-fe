import { Observable } from "rxjs"
import { EmployeeService } from "../../service/EmployeeService"
import { BaseResp } from "../../types/BaseResp"
import { DeleteEmployeeReq } from "../../types/employee/DeleteEmployeeReq"

export interface DeleteEmployeeUseCase {
    execute(deleteEmployeeReq: DeleteEmployeeReq): Observable<BaseResp>
}

export class DeleteEmployeeUseCaseImpl implements DeleteEmployeeUseCase {
    execute(deleteEmployeeReq: DeleteEmployeeReq): Observable<BaseResp> {
        return new EmployeeService().remove(deleteEmployeeReq)
    }

}