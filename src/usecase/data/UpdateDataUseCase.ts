import { Observable } from "rxjs"
import { DataService } from "../../service/DataService"
import { BaseResp } from "../../types/BaseResp"
import { UpdateDataReq } from "../../types/data/UpdateDataReq"

export interface UpdateDataUseCase {
    execute(updateDataReq: UpdateDataReq): Observable<BaseResp>
}

export class UpdateDataUseCaseImpl implements UpdateDataUseCase {
    execute(updateDataReq: UpdateDataReq): Observable<BaseResp> {
        return new DataService().update(updateDataReq)
    }

}