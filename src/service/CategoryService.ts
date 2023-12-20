import { Observable, from, map } from "rxjs"
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
}