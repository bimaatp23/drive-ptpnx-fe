import { Observable } from "rxjs"
import { CategoryService } from "../../service/CategoryService"
import { GetCategorysResp } from "../../types/category/GetCategorysResp"

export interface GetCategorysUseCase {
    execute(): Observable<GetCategorysResp>
}

export class GetCategorysUseCaseImpl implements GetCategorysUseCase {
    execute(): Observable<GetCategorysResp> {
        return new CategoryService().getCategorys()
    }
}