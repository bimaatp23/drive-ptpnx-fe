import { Observable, from, map } from "rxjs"
import { BaseResp } from "../types/BaseResp"
import { ChangePasswordReq } from "../types/user/ChangePasswordReq"
import { LoginReq } from "../types/user/LoginReq"
import { LoginResp } from "../types/user/LoginResp"
import { BaseService, BaseServiceImpl } from "./BaseService"

export class UserService {
    readonly endPoint = "/user"
    baseService: BaseService = new BaseServiceImpl()

    login(loginReq: LoginReq): Observable<LoginResp> {
        return from(this.baseService.httpPostBasic(this.endPoint + "/login", loginReq))
            .pipe(
                map((response) => response.data as LoginResp)
            )
    }

    changePassword(changePasswordReq: ChangePasswordReq): Observable<BaseResp> {
        return from(this.baseService.httpPost(this.endPoint + "/change-password", changePasswordReq))
            .pipe(
                map((response) => response.data as BaseResp)
            )
    }
}