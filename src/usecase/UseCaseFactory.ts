import { CreateCategoryUseCase, CreateCategoryUseCaseImpl } from "./category/CreateCategoryUseCase"
import { DeleteCategoryUseCase, DeleteCategoryUseCaseImpl } from "./category/DeleteCategoryUseCase"
import { GetCategorysUseCase, GetCategorysUseCaseImpl } from "./category/GetCategorysUseCase"
import { UpdateCategoryUseCase, UpdateCategoryUseCaseImpl } from "./category/UpdateCategoryUseCase"
import { DownloadFileUseCase, DownloadFileUseCaseImpl } from "./data/DownloadFileUseCase"
import { GetDatasUseCase, GetDatasUseCaseImpl } from "./data/GetDatasUseCase"
import { UpdateDataUseCase, UpdateDataUseCaseImpl } from "./data/UpdateDataUseCase"
import { UploadDataUseCase, UploadDataUseCaseImpl } from "./data/UploadDataUseCase"
import { CreateLockerUseCase, CreateLockerUseCaseImpl } from "./locker/CreateLockerUseCase"
import { DeleteLockerUseCase, DeleteLockerUseCaseImpl } from "./locker/DeleteLockerUseCase"
import { GetLockersUseCase, GetLockersUseCaseImpl } from "./locker/GetLockersUseCase"
import { UpdateLockerUseCase, UpdateLockerUseCaseImpl } from "./locker/UpdateLockerUseCase"
import { ChangePasswordUseCase, ChangePasswordUseCaseImpl } from "./user/ChangePasswordUseCase"
import { LoginUseCase, LoginUseCaseImpl } from "./user/LoginUseCase"
import { SessionUseCase, SessionUseCaseImpl } from "./user/SessionUseCase"

export interface UseCaseFactory {
    // User
    useLoginUseCase(): LoginUseCase
    useChangePasswordUseCase(): ChangePasswordUseCase
    useSessionUseCase(): SessionUseCase
    // Data
    useGetDatasUseCase(): GetDatasUseCase
    useUploadDataUseCase(): UploadDataUseCase
    useDownloadFileUseCase(): DownloadFileUseCase
    useUpdateDataUseCase(): UpdateDataUseCase
    // Category
    useGetCategorysUseCase(): GetCategorysUseCase
    useCreateCategoryUseCase(): CreateCategoryUseCase
    useUpdateCategoryUseCase(): UpdateCategoryUseCase
    useDeleteCategoryUseCase(): DeleteCategoryUseCase
    // Locker
    useGetLockersUseCase(): GetLockersUseCase
    useCreateLockerUseCase(): CreateLockerUseCase
    useUpdateLockerUseCase(): UpdateLockerUseCase
    useDeleteLockerUseCase(): DeleteLockerUseCase
}

export class UseCaseFactoryImpl implements UseCaseFactory {
    // User
    useLoginUseCase(): LoginUseCase {
        return new LoginUseCaseImpl()
    }
    useChangePasswordUseCase(): ChangePasswordUseCase {
        return new ChangePasswordUseCaseImpl()
    }
    useSessionUseCase(): SessionUseCase {
        return new SessionUseCaseImpl()
    }
    // Data
    useGetDatasUseCase(): GetDatasUseCase {
        return new GetDatasUseCaseImpl()
    }
    useUploadDataUseCase(): UploadDataUseCase {
        return new UploadDataUseCaseImpl()
    }
    useDownloadFileUseCase(): DownloadFileUseCase {
        return new DownloadFileUseCaseImpl()
    }
    useUpdateDataUseCase(): UpdateDataUseCase {
        return new UpdateDataUseCaseImpl()
    }
    // Category
    useGetCategorysUseCase(): GetCategorysUseCase {
        return new GetCategorysUseCaseImpl()
    }
    useCreateCategoryUseCase(): CreateCategoryUseCase {
        return new CreateCategoryUseCaseImpl()
    }
    useUpdateCategoryUseCase(): UpdateCategoryUseCase {
        return new UpdateCategoryUseCaseImpl()
    }
    useDeleteCategoryUseCase(): DeleteCategoryUseCase {
        return new DeleteCategoryUseCaseImpl()
    }
    // Locker
    useGetLockersUseCase(): GetLockersUseCase {
        return new GetLockersUseCaseImpl()
    }
    useCreateLockerUseCase(): CreateLockerUseCase {
        return new CreateLockerUseCaseImpl()
    }
    useUpdateLockerUseCase(): UpdateLockerUseCase {
        return new UpdateLockerUseCaseImpl()
    }
    useDeleteLockerUseCase(): DeleteLockerUseCase {
        return new DeleteLockerUseCaseImpl()
    }
}