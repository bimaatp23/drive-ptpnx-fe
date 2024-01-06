import { Observable } from "rxjs"
import { LoanService } from "../../service/LoanService"
import { BaseResp } from "../../types/BaseResp"
import { CreateLoanReq } from "../../types/loan/CreateLoanReq"

export interface CreateLoanUseCase {
    execute(createLoanReq: CreateLoanReq): Observable<BaseResp>
}

export class CreateLoanUseCaseImpl implements CreateLoanUseCase {
    execute(createLoanReq: CreateLoanReq): Observable<BaseResp> {
        return new LoanService().create(createLoanReq)
    }

}