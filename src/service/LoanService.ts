import { Observable, from, map } from "rxjs"
import { BaseResp } from "../types/BaseResp"
import { CreateLoanReq } from "../types/loan/CreateLoanReq"
import { DeleteLoanReq } from "../types/loan/DeleteLoanReq"
import { GetLoansResp } from "../types/loan/GetLoansResp"
import { UpdateLoanReq } from "../types/loan/UpdateLoanReq"
import { BaseService, BaseServiceImpl } from "./BaseService"

export class LoanService {
    readonly endPoint: string = "/loan"
    baseService: BaseService = new BaseServiceImpl()

    getLoans(): Observable<GetLoansResp> {
        return from(this.baseService.httpGet(this.endPoint))
            .pipe(
                map((response) => response.data as GetLoansResp)
            )
    }

    create(createLoanReq: CreateLoanReq): Observable<BaseResp> {
        return from(this.baseService.httpPost(this.endPoint, createLoanReq))
            .pipe(
                map((response) => response.data as BaseResp)
            )
    }

    update(updateLoanReq: UpdateLoanReq): Observable<BaseResp> {
        return from(this.baseService.httpPut(this.endPoint + "/" + updateLoanReq.id, updateLoanReq))
            .pipe(
                map((response) => response.data as BaseResp)
            )
    }

    remove(deleteLoanReq: DeleteLoanReq): Observable<BaseResp> {
        return from(this.baseService.httpDelete(this.endPoint + "/" + deleteLoanReq.id))
            .pipe(
                map((response) => response.data as BaseResp)
            )
    }
}