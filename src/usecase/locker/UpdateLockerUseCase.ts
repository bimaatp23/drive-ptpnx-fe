import { Observable } from "rxjs"
import { LockerService } from "../../service/LockerService"
import { BaseResp } from "../../types/BaseResp"
import { UpdateLockerReq } from "../../types/locker/UpdateLockerReq"

export interface UpdateLockerUseCase {
    execute(updateLockerReq: UpdateLockerReq): Observable<BaseResp>
}

export class UpdateLockerUseCaseImpl implements UpdateLockerUseCase {
    execute(updateLockerReq: UpdateLockerReq): Observable<BaseResp> {
        return new LockerService().update(updateLockerReq)
    }

}