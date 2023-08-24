import { LoginUseCase, LoginUseCaseImpl } from './user/LoginUseCase'
import { SessionUseCase, SessionUseCaseImpl } from './user/SessionUseCase'

export interface UseCaseFactory {
    createLoginUseCase(): LoginUseCase
    createSessionUseCase(): SessionUseCase
}

export class UseCaseFactoryImpl implements UseCaseFactory {
    createLoginUseCase(): LoginUseCase {
        return new LoginUseCaseImpl()
    }
    createSessionUseCase(): SessionUseCase {
        return new SessionUseCaseImpl()
    }

}