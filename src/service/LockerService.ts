import { Observable, from, map } from "rxjs"
import { GetLockersResp } from "../types/locker/GetLockersResp"
import { BaseService, BaseServiceImpl } from "./BaseService"

export class LockerService {
    readonly endPoint: string = "/locker"
    baseService: BaseService = new BaseServiceImpl()

    getLocker(): Observable<GetLockersResp> {
        return from(this.baseService.httpGet(this.endPoint))
            .pipe(
                map((response) => response.data as GetLockersResp)
            )
    }
}