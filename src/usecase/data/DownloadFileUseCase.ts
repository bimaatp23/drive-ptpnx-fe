import { Observable } from "rxjs"
import { DataService } from "../../service/DataService"

export interface DownloadFileUseCase {
    execute(id: string): Observable<File>
}

export class DownloadFileUseCaseImpl implements DownloadFileUseCase {
    execute(id: string): Observable<File> {
        return new DataService().download(id)
    }
}