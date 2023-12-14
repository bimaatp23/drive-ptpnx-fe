import { Observable } from "rxjs"
import { LockerService } from "../../service/LockerService"
import { BaseResp } from "../../types/BaseResp"
import { CreateLockerReq } from "../../types/locker/CreateLockerReq"

export interface CreateLockerUseCase {
    execute(createLockerReq: CreateLockerReq): Observable<BaseResp>
}

export class CreateLockerUseCaseImpl implements CreateLockerUseCase {
    execute(createLockerReq: CreateLockerReq): Observable<BaseResp> {
        return new LockerService().create(createLockerReq)
    }

}