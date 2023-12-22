import { Observable, from, map } from "rxjs"
import { BaseResp } from "../types/BaseResp"
import { GetDatasReq } from "../types/data/GetDatasReq"
import { GetDatasResp } from "../types/data/GetDatasResp"
import { UploadDataReq } from "../types/data/UploadDataReq"
import { BaseService, BaseServiceImpl } from "./BaseService"
import { removeEmptyParams } from "../Util"

export class DataService {
    readonly endPoint: string = "/data"
    baseService: BaseService = new BaseServiceImpl()

    getDatas(getDatasReq: GetDatasReq): Observable<GetDatasResp> {
        return from(this.baseService.httpGet(this.endPoint, {
            params: removeEmptyParams(getDatasReq)
        }))
            .pipe(
                map((response) => response.data as GetDatasResp)
            )
    }

    upload(uploadDataReq: UploadDataReq): Observable<BaseResp> {
        return from(this.baseService.httpPost(this.endPoint, uploadDataReq))
            .pipe(
                map((response) => response.data as BaseResp)
            )
    }

    download(id: string): Observable<string> {
        return from(this.baseService.httpGet(this.endPoint + "/" + id, { responseType: "arraybuffer" }))
            .pipe(
                map((response) => {
                    const blob = new Blob([response.data], { type: "application/octet-stream" })
                    return window.URL.createObjectURL(blob)
                })
            )
    }
}