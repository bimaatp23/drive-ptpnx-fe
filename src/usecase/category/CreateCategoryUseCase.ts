import { Observable } from "rxjs"
import { CategoryService } from "../../service/CategoryService"
import { BaseResp } from "../../types/BaseResp"
import { CreateCategoryReq } from "../../types/category/CreateCategoryReq"

export interface CreateCategoryUseCase {
    execute(createCategoryReq: CreateCategoryReq): Observable<BaseResp>
}

export class CreateCategoryUseCaseImpl implements CreateCategoryUseCase {
    execute(createCategoryReq: CreateCategoryReq): Observable<BaseResp> {
        return new CategoryService().create(createCategoryReq)
    }

}