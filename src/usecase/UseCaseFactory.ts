import { CreateCategoryUseCase, CreateCategoryUseCaseImpl } from "./category/CreateCategoryUseCase"
import { DeleteCategoryUseCase, DeleteCategoryUseCaseImpl } from "./category/DeleteCategoryUseCase"
import { GetCategorysUseCase, GetCategorysUseCaseImpl } from "./category/GetCategorysUseCase"
import { UpdateCategoryUseCase, UpdateCategoryUseCaseImpl } from "./category/UpdateCategoryUseCase"
import { DeleteDataUseCase, DeleteDataUseCaseImpl } from "./data/DeleteDataUseCase"
import { DownloadFileUseCase, DownloadFileUseCaseImpl } from "./data/DownloadFileUseCase"
import { GetDatasUseCase, GetDatasUseCaseImpl } from "./data/GetDatasUseCase"
import { UpdateDataUseCase, UpdateDataUseCaseImpl } from "./data/UpdateDataUseCase"
import { UploadDataUseCase, UploadDataUseCaseImpl } from "./data/UploadDataUseCase"
import { CreateEmployeeUseCase, CreateEmployeeUseCaseImpl } from "./employee/CreateEmployeeReq"
import { DeleteEmployeeUseCase, DeleteEmployeeUseCaseImpl } from "./employee/DeleteEmployeeUseCase"
import { GetEmployeesUseCase, GetEmployeesUseCaseImpl } from "./employee/GetEmployeesUseCase"
import { UpdateEmployeeUseCase, UpdateEmployeeUseCaseImpl } from "./employee/UpdateLockerUseCase"
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
    useDeleteDataUseCase(): DeleteDataUseCase
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
    // Employee
    useGetEmployeesUseCase(): GetEmployeesUseCase
    useCreateEmployeeUseCase(): CreateEmployeeUseCase
    useUpdateEmployeeUseCase(): UpdateEmployeeUseCase
    useDeleteEmployeeUseCase(): DeleteEmployeeUseCase
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
    useDeleteDataUseCase(): DeleteDataUseCase {
        return new DeleteDataUseCaseImpl()
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
    // Employee
    useGetEmployeesUseCase(): GetEmployeesUseCase {
        return new GetEmployeesUseCaseImpl()
    }
    useCreateEmployeeUseCase(): CreateEmployeeUseCase {
        return new CreateEmployeeUseCaseImpl()
    }
    useUpdateEmployeeUseCase(): UpdateEmployeeUseCase {
        return new UpdateEmployeeUseCaseImpl()
    }
    useDeleteEmployeeUseCase(): DeleteEmployeeUseCase {
        return new DeleteEmployeeUseCaseImpl()
    }
}