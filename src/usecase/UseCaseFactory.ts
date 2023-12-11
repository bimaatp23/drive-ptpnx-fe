import { DownloadFileUseCase, DownloadFileUseCaseImpl } from "./data/DownloadFileUseCase"
import { GetDatasUseCase, GetDatasUseCaseImpl } from "./data/GetDatasUseCase"
import { UploadDataUseCase, UploadDataUseCaseImpl } from "./data/UploadDataUseCase"
import { LoginUseCase, LoginUseCaseImpl } from "./user/LoginUseCase"
import { SessionUseCase, SessionUseCaseImpl } from "./user/SessionUseCase"

export interface UseCaseFactory {
    createLoginUseCase(): LoginUseCase
    createSessionUseCase(): SessionUseCase
    createGetDatasUseCase(): GetDatasUseCase
    createUploadDataUseCase(): UploadDataUseCase
    createDownloadFileUseCase(): DownloadFileUseCase
}

export class UseCaseFactoryImpl implements UseCaseFactory {
    createLoginUseCase(): LoginUseCase {
        return new LoginUseCaseImpl()
    }
    createSessionUseCase(): SessionUseCase {
        return new SessionUseCaseImpl()
    }
    createGetDatasUseCase(): GetDatasUseCase {
        return new GetDatasUseCaseImpl()
    }
    createUploadDataUseCase(): UploadDataUseCase {
        return new UploadDataUseCaseImpl()
    }
    createDownloadFileUseCase(): DownloadFileUseCase {
        return new DownloadFileUseCaseImpl()
    }
}