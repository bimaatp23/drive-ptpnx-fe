import { Observable } from "rxjs"
import { LockerService } from "../../service/LockerService"
import { BaseResp } from "../../types/BaseResp"
import { DeleteLockerReq } from "../../types/locker/DeleteLockerReq"

export interface DeleteLockerUseCase {
    execute(deleteLockerReq: DeleteLockerReq): Observable<BaseResp>
}

export class DeleteLockerUseCaseImpl implements DeleteLockerUseCase {
    execute(deleteLockerReq: DeleteLockerReq): Observable<BaseResp> {
        return new LockerService().remove(deleteLockerReq)
    }

}