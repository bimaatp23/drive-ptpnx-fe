import { Observable } from "rxjs"
import { CategoryService } from "../../service/CategoryService"
import { GetCatgeorysResp } from "../../types/category/GetCategorysResp"
import { GetLockersResp } from "../../types/locker/GetLockersResp"

export interface GetCategorysUseCase {
    execute(): Observable<GetCatgeorysResp>
}

export class GetCategorysUseCaseImpl implements GetCategorysUseCase {
    execute(): Observable<GetLockersResp> {
        return new CategoryService().getCategorys()
    }
}