import { Observable, map } from 'rxjs'
import { UserService } from '../../service/UserService'
import { LoginReq } from '../../types/user/LoginReq'
import { LoginResp } from '../../types/user/LoginResp'
import { SessionUseCaseImpl } from './SessionUseCase'

export interface LoginUseCase {
    execute(loginReq: LoginReq): Observable<LoginResp>
}

export class LoginUseCaseImpl implements LoginUseCase {
    execute(loginReq: LoginReq): Observable<LoginResp> {
        return new UserService().login(loginReq)
            .pipe(
                map((response) => {
                    if (response.errorSchema.errorCode === 200) {
                        new SessionUseCaseImpl().save(response)
                    }
                    return response
                })
            )
    }
}