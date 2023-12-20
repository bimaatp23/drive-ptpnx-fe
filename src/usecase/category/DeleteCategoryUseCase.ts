import { Observable } from "rxjs"
import { CategoryService } from "../../service/CategoryService"
import { BaseResp } from "../../types/BaseResp"
import { DeleteCategoryReq } from "../../types/category/DeleteCategoryReq"

export interface DeleteCategoryUseCase {
    execute(deleteCategoryReq: DeleteCategoryReq): Observable<BaseResp>
}

export class DeleteCategoryUseCaseImpl implements DeleteCategoryUseCase {
    execute(deleteCategoryReq: DeleteCategoryReq): Observable<BaseResp> {
        return new CategoryService().remove(deleteCategoryReq)
    }

}