import { Observable, from, map } from "rxjs"
import { BaseResp } from "../types/BaseResp"
import { CreateCategoryReq } from "../types/category/CreateCategoryReq"
import { DeleteCategoryReq } from "../types/category/DeleteCategoryReq"
import { GetCategorysResp } from "../types/category/GetCategorysResp"
import { UpdateCategoryReq } from "../types/category/UpdateCategoryReq"
import { BaseService, BaseServiceImpl } from "./BaseService"

export class CategoryService {
    readonly endPoint: string = "/category"
    baseService: BaseService = new BaseServiceImpl()

    getCategorys(): Observable<GetCategorysResp> {
        return from(this.baseService.httpGet(this.endPoint))
            .pipe(
                map((response) => response.data as GetCategorysResp)
            )
    }

    create(createCategoryReq: CreateCategoryReq): Observable<BaseResp> {
        return from(this.baseService.httpPost(this.endPoint, createCategoryReq))
            .pipe(
                map((response) => response.data as BaseResp)
            )
    }

    update(updateCategoryReq: UpdateCategoryReq): Observable<BaseResp> {
        return from(this.baseService.httpPut(this.endPoint + "/" + updateCategoryReq.id, updateCategoryReq))
            .pipe(
                map((response) => response.data as BaseResp)
            )
    }

    remove(deleteCategoryReq: DeleteCategoryReq): Observable<BaseResp> {
        return from(this.baseService.httpDelete(this.endPoint + "/" + deleteCategoryReq.id))
            .pipe(
                map((response) => response.data as BaseResp)
            )
    }
}