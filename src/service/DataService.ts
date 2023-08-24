import { Observable, from, map } from 'rxjs'
import { GetDatasReq } from '../types/data/GetDatasReq'
import { GetDatasResp } from '../types/data/GetDatasResp'
import { BaseService, BaseServiceImpl } from './BaseService'

export class DataService {
    readonly endPoint: string = 'http://localhost:3001/drive/api/data'
    baseService: BaseService = new BaseServiceImpl()

    getByCategory(getDatasReq: GetDatasReq): Observable<GetDatasResp> {
        return from(this.baseService.httpGet(this.endPoint + '/all/' + getDatasReq.kategori))
            .pipe(
                map((response) => response.data as GetDatasResp)
            )
    }
}