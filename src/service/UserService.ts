import axios from 'axios'
import { Observable, from, map } from 'rxjs'
import { LoginReq } from '../types/user/LoginReq'
import { LoginResp } from '../types/user/LoginResp'

export class UserService {
    readonly endPoint: string = 'http://localhost:3001/drive/api/user'

    login(loginReq: LoginReq): Observable<LoginResp> {
        return from(axios.post(this.endPoint + '/login', loginReq))
            .pipe(
                map((response) => response.data as LoginResp)
            )
    }
}