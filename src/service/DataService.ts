import { Observable, from, map } from "rxjs"
import { removeEmptyParams } from "../Util"
import { BaseResp } from "../types/BaseResp"
import { DeleteDataReq } from "../types/data/DeleteDataReq"
import { GetDatasReq } from "../types/data/GetDatasReq"
import { GetDatasResp } from "../types/data/GetDatasResp"
import { UpdateDataReq } from "../types/data/UpdateDataReq"
import { UploadDataReq } from "../types/data/UploadDataReq"
import { BaseService, BaseServiceImpl } from "./BaseService"

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

    download(id: string): Observable<File> {
        return from(this.baseService.httpGet(this.endPoint + "/" + id, { responseType: "arraybuffer" }))
            .pipe(
                map((response) => {
                    const contentType = (response.headers.get as (headerName: string) => string | null)("content-type")
                    let fileExtension = "unknown"
                    if (contentType) {
                        if (contentType.includes("application/pdf")) {
                            fileExtension = "pdf"
                        } else if (contentType.includes("image/png")) {
                            fileExtension = "png"
                        } else if (contentType.includes("image/jpeg") || contentType.includes("image/jpg")) {
                            fileExtension = "jpeg"
                        }
                    }
                    const filename = `${id}.${fileExtension}`
                    const file: File = new File([response.data], filename, { type: contentType ?? "application/octet-stream" })
                    return file
                })
            )
    }

    update(updateDataReq: UpdateDataReq): Observable<BaseResp> {
        return from(this.baseService.httpPut(this.endPoint + "/" + updateDataReq.id, updateDataReq))
            .pipe(
                map((response) => response.data as BaseResp)
            )
    }

    remove(deleteDataReq: DeleteDataReq): Observable<BaseResp> {
        return from(this.baseService.httpDelete(this.endPoint + "/" + deleteDataReq.id))
            .pipe(
                map((response) => response.data as BaseResp)
            )
    }
}