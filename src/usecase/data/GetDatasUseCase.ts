import { Observable } from "rxjs"
import { DataService } from "../../service/DataService"
import { GetDatasReq } from "../../types/data/GetDatasReq"
import { GetDatasResp } from "../../types/data/GetDatasResp"

export interface GetDatasUseCase {
    execute(getDatasReq: GetDatasReq): Observable<GetDatasResp>
}

export class GetDatasUseCaseImpl implements GetDatasUseCase {
    execute(getDatasReq: GetDatasReq): Observable<GetDatasResp> {
        return new DataService().getDatas(getDatasReq)
    }
}