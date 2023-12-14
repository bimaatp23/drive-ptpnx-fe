import { DownloadFileUseCase, DownloadFileUseCaseImpl } from "./data/DownloadFileUseCase"
import { GetDatasUseCase, GetDatasUseCaseImpl } from "./data/GetDatasUseCase"
import { UploadDataUseCase, UploadDataUseCaseImpl } from "./data/UploadDataUseCase"
import { ChangePasswordUseCase, ChangePasswordUseCaseImpl } from "./user/ChangePasswordUseCase"
import { LoginUseCase, LoginUseCaseImpl } from "./user/LoginUseCase"
import { SessionUseCase, SessionUseCaseImpl } from "./user/SessionUseCase"

export interface UseCaseFactory {
    useLoginUseCase(): LoginUseCase
    useChangePasswordUseCase(): ChangePasswordUseCase
    useSessionUseCase(): SessionUseCase
    useGetDatasUseCase(): GetDatasUseCase
    useUploadDataUseCase(): UploadDataUseCase
    useDownloadFileUseCase(): DownloadFileUseCase
}

export class UseCaseFactoryImpl implements UseCaseFactory {
    useLoginUseCase(): LoginUseCase {
        return new LoginUseCaseImpl()
    }
    useChangePasswordUseCase(): ChangePasswordUseCase {
        return new ChangePasswordUseCaseImpl()
    }
    useSessionUseCase(): SessionUseCase {
        return new SessionUseCaseImpl()
    }
    useGetDatasUseCase(): GetDatasUseCase {
        return new GetDatasUseCaseImpl()
    }
    useUploadDataUseCase(): UploadDataUseCase {
        return new UploadDataUseCaseImpl()
    }
    useDownloadFileUseCase(): DownloadFileUseCase {
        return new DownloadFileUseCaseImpl()
    }
}