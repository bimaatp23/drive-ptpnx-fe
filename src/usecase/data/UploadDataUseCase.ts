import { Observable } from "rxjs"
import { DataService } from "../../service/DataService"
import { BaseResp } from "../../types/BaseResp"
import { UploadDataReq } from "../../types/data/UploadDataReq"

export interface UploadDataUseCase {
    execute(uploadDataReq: UploadDataReq): Observable<BaseResp>
}

export class UploadDataUseCaseImpl implements UploadDataUseCase {
    execute(uploadDataReq: UploadDataReq): Observable<BaseResp> {
        return new DataService().upload(uploadDataReq)
    }
}