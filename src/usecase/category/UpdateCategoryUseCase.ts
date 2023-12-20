import { Observable } from "rxjs"
import { CategoryService } from "../../service/CategoryService"
import { BaseResp } from "../../types/BaseResp"
import { UpdateCategoryReq } from "../../types/category/UpdateCategoryReq"

export interface UpdateCategoryUseCase {
    execute(updateCategoryReq: UpdateCategoryReq): Observable<BaseResp>
}

export class UpdateCategoryUseCaseImpl implements UpdateCategoryUseCase {
    execute(updateCategoryReq: UpdateCategoryReq): Observable<BaseResp> {
        return new CategoryService().update(updateCategoryReq)
    }

}