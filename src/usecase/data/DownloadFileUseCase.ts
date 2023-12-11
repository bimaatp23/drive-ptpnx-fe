import { Observable } from "rxjs"
import { DataService } from "../../service/DataService"

export interface DownloadFileUseCase {
    execute(id: string): Observable<string>
}

export class DownloadFileUseCaseImpl implements DownloadFileUseCase {
    execute(id: string): Observable<string> {
        return new DataService().download(id)
    }
}