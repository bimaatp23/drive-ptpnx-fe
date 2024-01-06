import { Add, Delete, Edit } from "@mui/icons-material"
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material"
import moment from "moment"
import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { finalize } from "rxjs"
import { setNotification } from "../Util"
import CustomModal from "../components/CustomModal"
import MainPage from "../components/MainPage"
import { BaseResp } from "../types/BaseResp"
import { Data } from "../types/data/Data"
import { GetDatasResp } from "../types/data/GetDatasResp"
import { Employee } from "../types/employee/Employee"
import { GetEmployeesResp } from "../types/employee/GetEmployeesResp"
import { CreateLoanReq } from "../types/loan/CreateLoanReq"
import { DeleteLoanReq } from "../types/loan/DeleteLoanReq"
import { GetLoansResp } from "../types/loan/GetLoansResp"
import { Loan as LoanType } from "../types/loan/Loan"
import { UpdateLoanReq } from "../types/loan/UpdateLoanReq"
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory"

export default function Loan() {
    const useCaseFactory: UseCaseFactory = useMemo(() => new UseCaseFactoryImpl(), [])
    const [loans, setLoans] = useState<LoanType[]>([])
    const [datas, setDatas] = useState<Data[]>([])
    const [employees, setEmployees] = useState<Employee[]>([])
    const [createLoanReq, setCreateLoanReq] = useState<CreateLoanReq>({
        dataId: "",
        employeeId: ""
    })
    const [updateLoanReq, setUpdateLoanReq] = useState<UpdateLoanReq>({
        id: ""
    })
    const [deleteLoanReq, setDeleteLoanReq] = useState<DeleteLoanReq>({
        id: ""
    })
    const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false)
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false)
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false)

    const [isStatic, setIsStatic] = useState<boolean>(false)
    useEffect(() => setIsStatic(true), [])

    useEffect(() => {
        if (isStatic) {
            useCaseFactory.useGetLoansUseCase().execute()
                .subscribe({
                    next: (response: GetLoansResp) => {
                        if (response.errorSchema.errorCode === 200) {
                            setLoans(response.outputSchema)
                        }
                    },
                    error: (error) => {
                        setNotification({
                            icon: "error",
                            message: error.response.data.errorSchema?.errorMessage ?? error.response.statusText
                        })
                    }
                })
            useCaseFactory.useGetDatasUseCase().execute({
                categoryId: "",
                lockerId: "",
                dateFrom: "2017-01-01",
                dateUntil: "",
                documentNumber: "",
                description: ""
            })
                .subscribe({
                    next: (response: GetDatasResp) => {
                        if (response.errorSchema.errorCode === 200) {
                            setDatas(response.outputSchema)
                        }
                    },
                    error: (error) => {
                        setNotification({
                            icon: "error",
                            message: error.response.data.errorSchema?.errorMessage ?? error.response.statusText
                        })
                    }
                })
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

    const getLoanList = (): void => {
        useCaseFactory.useGetLoansUseCase().execute()
            .subscribe({
                next: (response: GetLoansResp) => {
                    if (response.errorSchema.errorCode === 200) {
                        setLoans(response.outputSchema)
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

    const doCreateLoan = (): void => {
        useCaseFactory.useCreateLoanUseCase().execute(createLoanReq)
            .pipe(
                finalize(() => {
                    setIsModalCreateOpen(false)
                    getLoanList()
                })
            )
            .subscribe({
                next: (response: BaseResp) => {
                    if (response.errorSchema.errorCode === 200) {
                        setNotification({
                            icon: "success",
                            message: response.errorSchema.errorMessage
                        })
                        setCreateLoanReq({
                            dataId: "",
                            employeeId: ""
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

    const doUpdateLoan = (): void => {
        useCaseFactory.useUpdateLoanUseCase().execute(updateLoanReq)
            .pipe(
                finalize(() => {
                    setIsModalUpdateOpen(false)
                    getLoanList()
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

    const doDeleteLoan = (): void => {
        useCaseFactory.useDeleteLoanUseCase().execute(deleteLoanReq)
            .pipe(
                finalize(() => {
                    setIsModalDeleteOpen(false)
                    getLoanList()
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
            title="Tambah Pinjaman"
            open={isModalCreateOpen}
            onClose={() => setIsModalCreateOpen(false)}
            size="small"
        >
            <FormControl fullWidth>
                <InputLabel id="label-data" size="small">Dokumen</InputLabel>
                <Select
                    name="dataId"
                    label="Dokumen"
                    size="small"
                    value={createLoanReq.dataId}
                    onChange={handleCreateOnChange}
                    labelId="label-data"
                    sx={{ background: "white" }}
                >
                    {datas.map((data) => {
                        return <MenuItem value={data.id}>{data.documentNumber}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="label-employee" size="small">Karyawan</InputLabel>
                <Select
                    name="employeeId"
                    label="Dokumen"
                    size="small"
                    value={createLoanReq.employeeId}
                    onChange={handleCreateOnChange}
                    labelId="label-employee"
                    sx={{ background: "white" }}
                >
                    {employees.map((employee) => {
                        return <MenuItem value={employee.id}>{employee.name}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <Button
                variant="contained"
                onClick={doCreateLoan}
                disabled={!isCreateReady()}
            >
                Tambah
            </Button>
        </CustomModal>
    }

    const displayUpdateModal = () => {
        return <CustomModal
            title="Edit Pinjaman"
            open={isModalUpdateOpen}
            onClose={() => setIsModalUpdateOpen(false)}
            size="small"
        >
            <Typography
                fontWeight="bold"
            >
                Yakin dokumen sudah dikembalikan ?
            </Typography>
            <Button
                variant="contained"
                onClick={doUpdateLoan}
                disabled={!isUpdateReady()}
            >
                Simpan
            </Button>
        </CustomModal>
    }

    const displayDeleteModal = () => {
        return <CustomModal
            title="Hapus Pinjaman"
            open={isModalDeleteOpen}
            onClose={() => setIsModalDeleteOpen(false)}
            size="small"
        >
            <Typography
                fontWeight="bold"
            >
                Yakin hapus pinjaman ini ?
            </Typography>
            <Button
                variant="contained"
                color="error"
                onClick={doDeleteLoan}
            >
                Hapus
            </Button>
        </CustomModal>
    }

    const handleCreateOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<any>): void => {
        const { name, value } = e.target
        setCreateLoanReq({
            ...createLoanReq,
            [name]: value
        })
    }

    const isCreateReady = (): boolean => {
        return createLoanReq.dataId !== "" &&
            createLoanReq.employeeId !== ""
    }

    const isUpdateReady = (): boolean => {
        return updateLoanReq.id !== ""
    }

    return <MainPage
        title="Peminjaman"
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
                            Dokumen
                        </TableCell>
                        <TableCell
                            sx={{ fontWeight: "bold" }}
                            align="center"
                        >
                            Karyawan
                        </TableCell>
                        <TableCell
                            sx={{ fontWeight: "bold" }}
                            align="center"
                        >
                            Tanggal Pinjam
                        </TableCell>
                        <TableCell
                            sx={{ fontWeight: "bold" }}
                            align="center"
                        >
                            Tanggal Kembali
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
                    {loans.length > 0 ?
                        loans.map((loan, index) =>
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
                                    {datas.find((data) => data.id === loan.dataId)?.documentNumber}
                                </TableCell>
                                <TableCell
                                    align="center"
                                >
                                    {employees.find((employee) => employee.id === loan.employeeId)?.name}
                                </TableCell>
                                <TableCell
                                    align="center"
                                >
                                    {moment(loan.loanDate).format("YYYY-MM-DD HH:mm:ss")}
                                </TableCell>
                                <TableCell
                                    align="center"
                                >
                                    {loan.returnDate ? moment(loan.returnDate).format("YYYY-MM-DD HH:mm:ss") : ""}
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
                                                    setUpdateLoanReq({
                                                        id: loan.id
                                                    })
                                                    setIsModalUpdateOpen(true)
                                                }}
                                                disabled={!!loan.returnDate}
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
                                                    setDeleteLoanReq({
                                                        id: loan.id
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
                                colSpan={6}
                                align="center"
                            >
                                No Loan Available
                            </TableCell>
                        </TableRow>}
                </TableBody>
            </Table>
        </TableContainer>
    </MainPage>
}