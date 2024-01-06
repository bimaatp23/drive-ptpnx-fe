import { Observable } from "rxjs"
import { LoanService } from "../../service/LoanService"
import { BaseResp } from "../../types/BaseResp"
import { DeleteLoanReq } from "../../types/loan/DeleteLoanReq"

export interface DeleteLoanUseCase {
    execute(deleteLoanReq: DeleteLoanReq): Observable<BaseResp>
}

export class DeleteLoanUseCaseImpl implements DeleteLoanUseCase {
    execute(deleteLoanReq: DeleteLoanReq): Observable<BaseResp> {
        return new LoanService().remove(deleteLoanReq)
    }

}