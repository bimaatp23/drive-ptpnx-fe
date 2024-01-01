import { Observable } from "rxjs"
import { DataService } from "../../service/DataService"
import { BaseResp } from "../../types/BaseResp"
import { DeleteDataReq } from "../../types/data/DeleteDataReq"

export interface DeleteDataUseCase {
    execute(deleteDataReq: DeleteDataReq): Observable<BaseResp>
}

export class DeleteDataUseCaseImpl implements DeleteDataUseCase {
    execute(deleteDataReq: DeleteDataReq): Observable<BaseResp> {
        return new DataService().remove(deleteDataReq)
    }

}