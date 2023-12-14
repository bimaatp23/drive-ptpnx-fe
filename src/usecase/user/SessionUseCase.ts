import { LoginResp } from "../../types/user/LoginResp"
import { User } from "../../types/user/User"

export interface SessionUseCase {
    save(loginResp: LoginResp): void
    get(): User
    clear(): void
}

export class SessionUseCaseImpl implements SessionUseCase {
    save(loginResp: LoginResp): void {
        sessionStorage.setItem("username", loginResp.outputSchema.username)
        sessionStorage.setItem("name", loginResp.outputSchema.name)
        sessionStorage.setItem("role", loginResp.outputSchema.role)
    }
    get(): User {
        return {
            username: sessionStorage.getItem("username") as string,
            name: sessionStorage.getItem("name") as string,
            role: sessionStorage.getItem("role") as string
        }
    }
    clear(): void {
        sessionStorage.clear()
    }
}