import { Add, Delete, Edit } from "@mui/icons-material"
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useState } from "react"
import { finalize } from "rxjs"
import { setNotification } from "../Util"
import CustomModal from "../components/CustomModal"
import MainPage from "../components/MainPage"
import { BaseResp } from "../types/BaseResp"
import { CreateEmployeeReq } from "../types/employee/CreateEmployeeReq"
import { DeleteEmployeeReq } from "../types/employee/DeleteEmployeeReq"
import { Employee as EmployeeType } from "../types/employee/Employee"
import { GetEmployeesResp } from "../types/employee/GetEmployeesResp"
import { UpdateEmployeeReq } from "../types/employee/UpdateEmployeeReq"
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory"

export default function Employee() {
    const useCaseFactory: UseCaseFactory = useMemo(() => new UseCaseFactoryImpl(), [])
    const [employees, setEmployees] = useState<EmployeeType[]>([])
    const [createEmployeeReq, setCreateEmployeeReq] = useState<CreateEmployeeReq>({
        name: "",
        contact: ""
    })
    const [updateEmployeeReq, setUpdateEmployeeReq] = useState<UpdateEmployeeReq>({
        id: "",
        name: "",
        contact: ""
    })
    const [deleteEmployeeReq, setDeleteEmployeeReq] = useState<DeleteEmployeeReq>({
        id: ""
    })
    const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false)
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false)
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false)

    const [isStatic, setIsStatic] = useState<boolean>(false)
    useEffect(() => setIsStatic(true), [])

    useEffect(() => {
        if (isStatic) {
            useCaseFactory.useGetEmployeesUseCase().execute()
                .subscribe({
                    next: (response: GetEmployeesResp) => {
                        if (response.errorSchema.errorCode === 200) {
                            setEmployees(response.outputSchema)
                        }
                    },
                    error: (error) => {
                        setNotification({
                            icon: "error",
                            message: error.response.data.errorSchema?.errorMessage ?? error.response.statusText
                        })
                    }
                })
        }
    }, [isStatic, useCaseFactory])

    const getEmployeeList = (): void => {
        useCaseFactory.useGetEmployeesUseCase().execute()
            .subscribe({
                next: (response: GetEmployeesResp) => {
                    if (response.errorSchema.errorCode === 200) {
                        setEmployees(response.outputSchema)
                    }
                },
                error: (error) => {
                    setNotification({
                        icon: "error",
                        message: error.response.data.errorSchema?.errorMessage ?? error.response.statusText
                    })
                }
            })
    }

    const doCreateEmployee = (): void => {
        useCaseFactory.useCreateEmployeeUseCase().execute(createEmployeeReq)
            .pipe(
                finalize(() => {
                    setIsModalCreateOpen(false)
                    getEmployeeList()
                })
            )
            .subscribe({
                next: (response: BaseResp) => {
                    if (response.errorSchema.errorCode === 200) {
                        setNotification({
                            icon: "success",
                            message: response.errorSchema.errorMessage
                        })
                        setCreateEmployeeReq({
                            name: "",
                            contact: ""
                        })
                    }
                },
                error: (error) => {
                    setNotification({
                        icon: "error",
                        message: error.response.data.errorSchema?.errorMessage ?? error.response.statusText
                    })
                }
            })
    }

    const doUpdateEmployee = (): void => {
        useCaseFactory.useUpdateEmployeeUseCase().execute(updateEmployeeReq)
            .pipe(
                finalize(() => {
                    setIsModalUpdateOpen(false)
                    getEmployeeList()
                })
            )
            .subscribe({
                next: (response: BaseResp) => {
                    if (response.errorSchema.errorCode === 200) {
                        setNotification({
                            icon: "success",
                            message: response.errorSchema.errorMessage
                        })
                    }
                },
                error: (error) => {
                    setNotification({
                        icon: "error",
                        message: error.response.data.errorSchema?.errorMessage ?? error.response.statusText
                    })
                }
            })
    }

    const doDeleteEmployee = (): void => {
        useCaseFactory.useDeleteEmployeeUseCase().execute(deleteEmployeeReq)
            .pipe(
                finalize(() => {
                    setIsModalDeleteOpen(false)
                    getEmployeeList()
                })
            )
            .subscribe({
                next: (response: BaseResp) => {
                    if (response.errorSchema.errorCode === 200) {
                        setNotification({
                            icon: "success",
                            message: response.errorSchema.errorMessage
                        })
                    }
                },
                error: (error) => {
                    setNotification({
                        icon: "error",
                        message: error.response.data.errorSchema?.errorMessage ?? error.response.statusText
                    })
                }
            })
    }

    const displayCreateModal = () => {
        return <CustomModal
            title="Tambah Karyawan"
            open={isModalCreateOpen}
            onClose={() => setIsModalCreateOpen(false)}
            size="small"
        >
            <TextField
                size="small"
                id="name"
                label="Nama"
                fullWidth
                value={createEmployeeReq.name}
                onChange={handleCreateOnChange}
                onKeyDown={handleCreateOnEnter}
            />
            <TextField
                type="number"
                size="small"
                id="contact"
                label="Kontak"
                fullWidth
                value={createEmployeeReq.contact}
                onChange={handleCreateOnChange}
                onKeyDown={handleCreateOnEnter}
            />
            <Button
                variant="contained"
                onClick={doCreateEmployee}
                disabled={!isCreateReady()}
            >
                Tambah
            </Button>
        </CustomModal>
    }

    const displayUpdateModal = () => {
        return <CustomModal
            title="Edit Loker"
            open={isModalUpdateOpen}
            onClose={() => setIsModalUpdateOpen(false)}
            size="small"
        >
            <TextField
                size="small"
                id="name"
                label="Nama"
                fullWidth
                value={updateEmployeeReq.name}
                onChange={handleUpdateOnChange}
                onKeyDown={handleUpdateOnEnter}
            />
            <TextField
                type="number"
                size="small"
                id="contact"
                label="Kontak"
                fullWidth
                value={updateEmployeeReq.contact}
                onChange={handleUpdateOnChange}
                onKeyDown={handleUpdateOnEnter}
            />
            <Button
                variant="contained"
                onClick={doUpdateEmployee}
                disabled={!isUpdateReady()}
            >
                Simpan
            </Button>
        </CustomModal>
    }

    const displayDeleteModal = () => {
        return <CustomModal
            title="Hapus Loker"
            open={isModalDeleteOpen}
            onClose={() => setIsModalDeleteOpen(false)}
            size="small"
        >
            <Typography
                fontWeight="bold"
            >
                Yakin hapus loker ini ?
            </Typography>
            <Button
                variant="contained"
                color="error"
                onClick={doDeleteEmployee}
            >
                Hapus
            </Button>
        </CustomModal>
    }

    const handleCreateOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setCreateEmployeeReq({
            ...createEmployeeReq,
            [e.target.id]: e.target.value
        })
    }

    const handleUpdateOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setUpdateEmployeeReq({
            ...updateEmployeeReq,
            [e.target.id]: e.target.value
        })
    }

    const handleCreateOnEnter = (e: KeyboardEvent<HTMLDivElement>): void => {
        if (isCreateReady()) {
            if (e.key === "Enter") {
                doCreateEmployee()
            }
        }
    }

    const handleUpdateOnEnter = (e: KeyboardEvent<HTMLDivElement>): void => {
        if (isUpdateReady()) {
            if (e.key === "Enter") {
                doUpdateEmployee()
            }
        }
    }

    const isCreateReady = (): boolean => {
        return createEmployeeReq.name !== "" &&
            createEmployeeReq.contact !== ""
    }

    const isUpdateReady = (): boolean => {
        return updateEmployeeReq.id !== "" &&
            updateEmployeeReq.name !== "" &&
            updateEmployeeReq.contact !== ""
    }

    return <MainPage
        title="Karyawan"
        headElement={
            <Tooltip
                title="Tambah"
                arrow
            >
                <Button
                    variant="contained"
                    onClick={() => setIsModalCreateOpen(true)}
                >
                    <Add />
                </Button>
            </Tooltip>
        }
    >
        {displayCreateModal()}
        {displayUpdateModal()}
        {displayDeleteModal()}
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{ fontWeight: "bold" }}
                            align="center"
                        >
                            #
                        </TableCell>
                        <TableCell
                            sx={{ fontWeight: "bold" }}
                            align="center"
                        >
                            Nama
                        </TableCell>
                        <TableCell
                            sx={{ fontWeight: "bold" }}
                            align="center"
                        >
                            Kontak
                        </TableCell>
                        <TableCell
                            sx={{ fontWeight: "bold" }}
                            align="center"
                        >
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.length > 0 ?
                        employees.map((employee, index) =>
                            <TableRow key={index}>
                                <TableCell
                                    sx={{ fontWeight: "bold" }}
                                    align="center"
                                >
                                    {index + 1}
                                </TableCell>
                                <TableCell
                                    align="center"
                                >
                                    {employee.name}
                                </TableCell>
                                <TableCell
                                    align="center"
                                >
                                    {employee.contact}
                                </TableCell>
                                <TableCell
                                    align="center"
                                >
                                    <Stack
                                        width="100%"
                                        display="flex"
                                        flexDirection="row"
                                        columnGap={2}
                                        justifyContent="center"
                                    >
                                        <Tooltip
                                            title="Edit"
                                            arrow
                                        >
                                            <Button
                                                variant="contained"
                                                onClick={() => {
                                                    setUpdateEmployeeReq({
                                                        id: employee.id,
                                                        name: employee.name,
                                                        contact: employee.contact
                                                    })
                                                    setIsModalUpdateOpen(true)
                                                }}
                                            >
                                                <Edit />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip
                                            title="Hapus"
                                            arrow
                                        >
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => {
                                                    setDeleteEmployeeReq({
                                                        id: employee.id
                                                    })
                                                    setIsModalDeleteOpen(true)
                                                }}
                                            >
                                                <Delete />
                                            </Button>
                                        </Tooltip>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        )
                        :
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                align="center"
                            >
                                No Employee Available
                            </TableCell>
                        </TableRow>}
                </TableBody>
            </Table>
        </TableContainer>
    </MainPage>
}