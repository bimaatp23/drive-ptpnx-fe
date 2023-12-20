import { Observable, from, map } from "rxjs"
import { BaseResp } from "../types/BaseResp"
import { CreateLockerReq } from "../types/locker/CreateLockerReq"
import { DeleteLockerReq } from "../types/locker/DeleteLockerReq"
import { GetLockersResp } from "../types/locker/GetLockersResp"
import { UpdateLockerReq } from "../types/locker/UpdateLockerReq"
import { BaseService, BaseServiceImpl } from "./BaseService"

export class LockerService {
    readonly endPoint: string = "/locker"
    baseService: BaseService = new BaseServiceImpl()

    getLockers(): Observable<GetLockersResp> {
        return from(this.baseService.httpGet(this.endPoint))
            .pipe(
                map((response) => response.data as GetLockersResp)
            )
    }

    create(createLockerReq: CreateLockerReq): Observable<BaseResp> {
        return from(this.baseService.httpPost(this.endPoint + "/create", createLockerReq))
            .pipe(
                map((response) => response.data as BaseResp)
            )
    }

    update(updateLockerReq: UpdateLockerReq): Observable<BaseResp> {
        return from(this.baseService.httpPost(this.endPoint + "/update", updateLockerReq))
            .pipe(
                map((response) => response.data as BaseResp)
            )
    }

    remove(deleteLockerReq: DeleteLockerReq): Observable<BaseResp> {
        return from(this.baseService.httpPost(this.endPoint + "/delete", deleteLockerReq))
            .pipe(
                map((response) => response.data as BaseResp)
            )
    }
}