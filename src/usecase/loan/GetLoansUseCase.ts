import { Observable } from "rxjs"
import { LoanService } from "../../service/LoanService"
import { GetLoansResp } from "../../types/loan/GetLoansResp"

export interface GetLoansUseCase {
    execute(): Observable<GetLoansResp>
}

export class GetLoansUseCaseImpl implements GetLoansUseCase {
    execute(): Observable<GetLoansResp> {
        return new LoanService().getLoans()
    }
}