import { GetDatasUseCase, GetDatasUseCaseImpl } from "./data/GetDatasUseCase"
import { LoginUseCase, LoginUseCaseImpl } from "./user/LoginUseCase"
import { SessionUseCase, SessionUseCaseImpl } from "./user/SessionUseCase"

export interface UseCaseFactory {
    createLoginUseCase(): LoginUseCase
    createSessionUseCase(): SessionUseCase
    createGetDatasUseCase(): GetDatasUseCase
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
}