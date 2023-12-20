import { Observable, from, map } from "rxjs"
import { BaseResp } from "../types/BaseResp"
import { CreateCategoryReq } from "../types/category/CreateCategoryReq"
import { UpdateCategoryReq } from "../types/category/UpdateCategoryReq"
import { GetLockersResp } from "../types/locker/GetLockersResp"
import { BaseService, BaseServiceImpl } from "./BaseService"

export class CategoryService {
    readonly endPoint: string = "/category"
    baseService: BaseService = new BaseServiceImpl()

    getCategorys(): Observable<GetLockersResp> {
        return from(this.baseService.httpGet(this.endPoint))
            .pipe(
                map((response) => response.data as GetLockersResp)
            )
    }

    create(createCategoryReq: CreateCategoryReq): Observable<BaseResp> {
        return from(this.baseService.httpPost(this.endPoint + "/create", createCategoryReq))
            .pipe(
                map((response) => response.data as BaseResp)
            )
    }

    update(updateCategoryReq: UpdateCategoryReq): Observable<BaseResp> {
        return from(this.baseService.httpPost(this.endPoint + "/update", updateCategoryReq))
            .pipe(
                map((response) => response.data as BaseResp)
            )
    }
}