import { Observable } from "rxjs"
import { LoanService } from "../../service/LoanService"
import { BaseResp } from "../../types/BaseResp"
import { UpdateLoanReq } from "../../types/loan/UpdateLoanReq"

export interface UpdateLoanUseCase {
    execute(updateLoanReq: UpdateLoanReq): Observable<BaseResp>
}

export class UpdateLoanUseCaseImpl implements UpdateLoanUseCase {
    execute(updateLoanReq: UpdateLoanReq): Observable<BaseResp> {
        return new LoanService().update(updateLoanReq)
    }

}