import { Observable } from "rxjs"
import { LockerService } from "../../service/LockerService"
import { GetLockersResp } from "../../types/locker/GetLockersResp"

export interface GetLockersUseCase {
    execute(): Observable<GetLockersResp>
}

export class GetLockersUseCaseImpl implements GetLockersUseCase {
    execute(): Observable<GetLockersResp> {
        return new LockerService().getLocker()
    }
}