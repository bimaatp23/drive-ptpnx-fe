import { Observable } from "rxjs"
import { UserService } from "../../service/UserService"
import { BaseResp } from "../../types/BaseResp"
import { ChangePasswordReq } from "../../types/user/ChangePasswordReq"

export interface ChangePasswordUseCase {
    execute(changePasswordReq: ChangePasswordReq): Observable<BaseResp>
}

export class ChangePasswordUseCaseImpl implements ChangePasswordUseCase {
    execute(changePasswordReq: ChangePasswordReq): Observable<BaseResp> {
        return new UserService().changePassword(changePasswordReq)
    }
}