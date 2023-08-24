import { LoginResp } from '../../types/user/LoginResp'
import { User } from '../../types/user/User'

export interface SessionUseCase {
    save(loginResp: LoginResp): void
    get(): User
    getToken(): string
    clear(): void
}

export class SessionUseCaseImpl implements SessionUseCase {
    save(loginResp: LoginResp): void {
        sessionStorage.setItem('name', loginResp.outputSchema.name)
        sessionStorage.setItem('role', loginResp.outputSchema.role)
        sessionStorage.setItem('username', loginResp.outputSchema.username)
        sessionStorage.setItem('token', loginResp.outputSchema.token)
    }
    get(): User {
        return {
            name: sessionStorage.getItem('name') as string,
            role: sessionStorage.getItem('role') as string,
            username: sessionStorage.getItem('username') as string
        }
    }
    getToken(): string {
        return sessionStorage.getItem('token') as string
    }
    clear(): void {
        sessionStorage.clear()
    }
}