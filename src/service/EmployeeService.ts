import { Observable, from, map } from "rxjs"
import { BaseResp } from "../types/BaseResp"
import { CreateEmployeeReq } from "../types/employee/CreateEmployeeReq"
import { DeleteEmployeeReq } from "../types/employee/DeleteEmployeeReq"
import { GetEmployeesResp } from "../types/employee/GetEmployeesResp"
import { UpdateEmployeeReq } from "../types/employee/UpdateEmployeeReq"
import { BaseService, BaseServiceImpl } from "./BaseService"

export class EmployeeService {
    readonly endPoint: string = "/employee"
    baseService: BaseService = new BaseServiceImpl()

    getEmployees(): Observable<GetEmployeesResp> {
        return from(this.baseService.httpGet(this.endPoint))
            .pipe(
                map((response) => response.data as GetEmployeesResp)
            )
    }

    create(createEmployeeReq: CreateEmployeeReq): Observable<BaseResp> {
        return from(this.baseService.httpPost(this.endPoint, createEmployeeReq))
            .pipe(
                map((response) => response.data as BaseResp)
            )
    }

    update(updateEmployeeReq: UpdateEmployeeReq): Observable<BaseResp> {
        return from(this.baseService.httpPut(this.endPoint + "/" + updateEmployeeReq.id, updateEmployeeReq))
            .pipe(
                map((response) => response.data as BaseResp)
            )
    }

    remove(deleteEmployeeReq: DeleteEmployeeReq): Observable<BaseResp> {
        return from(this.baseService.httpDelete(this.endPoint + "/" + deleteEmployeeReq.id))
            .pipe(
                map((response) => response.data as BaseResp)
            )
    }
}