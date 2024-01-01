import { Delete, Download, Edit } from "@mui/icons-material"
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import moment from "moment"
import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useState } from "react"
import { finalize } from "rxjs"
import { setNotification } from "../Util"
import CustomModal from "../components/CustomModal"
import MainPage from "../components/MainPage"
import SearchControl from "../components/SearchControl"
import { BaseResp } from "../types/BaseResp"
import { Category } from "../types/category/Category"
import { GetCategorysResp } from "../types/category/GetCategorysResp"
import { Data as DataType } from "../types/data/Data"
import { DeleteDataReq } from "../types/data/DeleteDataReq"
import { GetDatasReq } from "../types/data/GetDatasReq"
import { GetDatasResp } from "../types/data/GetDatasResp"
import { UpdateDataReq } from "../types/data/UpdateDataReq"
import { GetLockersResp } from "../types/locker/GetLockersResp"
import { Locker } from "../types/locker/Locker"
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory"

export default function Data() {
    const useCaseFactory: UseCaseFactory = useMemo(() => new UseCaseFactoryImpl(), [])
    const currentDate: Date = useMemo(() => new Date(), [])
    const aYearAgo: Date = useMemo(() => {
        const result: Date = new Date()
        result.setFullYear(currentDate.getFullYear() - 1)
        return result
    }, [currentDate])
    const [datas, setDatas] = useState<DataType[]>([])
    const [getDatasReq, setGetDatasReq] = useState<GetDatasReq>({
        categoryId: "",
        lockerId: "",
        dateFrom: moment(aYearAgo).format("YYYY-MM-DD"),
        dateUntil: moment(currentDate).format("YYYY-MM-DD"),
        description: "",
        documentNumber: ""
    })
    const [categorys, setCategorys] = useState<Category[]>([])
    const [lockers, setLockers] = useState<Locker[]>([])
    const [updateDataReq, setUpdateDataReq] = useState<UpdateDataReq>({
        id: "",
        date: "",
        documentNumber: "",
        description: ""
    })
    const [deleteDataReq, setDeleteDataReq] = useState<DeleteDataReq>({
        id: ""
    })
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false)
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false)

    const [isStatic, setIsStatic] = useState<boolean>(false)
    useEffect(() => setIsStatic(true), [])

    useEffect(() => {
        if (isStatic) {
            const firstGetDatasReq: GetDatasReq = {
                categoryId: "",
                lockerId: "",
                dateFrom: moment(aYearAgo).format("YYYY-MM-DD"),
                dateUntil: moment(currentDate).format("YYYY-MM-DD"),
                description: "",
                documentNumber: ""
            }
            useCaseFactory.useGetDatasUseCase().execute(firstGetDatasReq)
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
            useCaseFactory.useGetCategorysUseCase().execute()
                .subscribe({
                    next: (response: GetCategorysResp) => {
                        if (response.errorSchema.errorCode === 200) {
                            setCategorys(response.outputSchema)
                        }
                    },
                    error: (error) => {
                        setNotification({
                            icon: "error",
                            message: error.response.data.errorSchema?.errorMessage ?? error.response.statusText
                        })
                    }
                })
            useCaseFactory.useGetLockersUseCase().execute()
                .subscribe({
                    next: (response: GetLockersResp) => {
                        if (response.errorSchema.errorCode === 200) {
                            setLockers(response.outputSchema)
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
    }, [isStatic, useCaseFactory, currentDate, aYearAgo])

    const loadData = (): void => {
        useCaseFactory.useGetDatasUseCase().execute(getDatasReq)
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
    }

    const handleDownload = (data: DataType): void => {
        const { id, file, documentNumber } = data
        useCaseFactory.useDownloadFileUseCase().execute(id)
            .subscribe({
                next: (response: Blob) => {
                    let downloadLink = document.createElement("a")
                    downloadLink.href = window.URL.createObjectURL(response)
                    downloadLink.download = [documentNumber, file.split(".")[1]].join(".")
                    downloadLink.text = "link"
                    downloadLink.click()
                },
                error: (error) => {
                    setNotification({
                        icon: "error",
                        message: error.response.data.errorSchema?.errorMessage ?? error.response.statusText
                    })
                }
            })
    }

    const doUpdateData = (): void => {
        useCaseFactory.useUpdateDataUseCase().execute(updateDataReq)
            .pipe(
                finalize(() => {
                    setIsModalUpdateOpen(false)
                    loadData()
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

    const doDeleteData = (): void => {
        useCaseFactory.useDeleteDataUseCase().execute(deleteDataReq)
            .pipe(
                finalize(() => {
                    setIsModalDeleteOpen(false)
                    loadData()
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

    const displayUpdateModal = () => {
        return <CustomModal
            title="Edit Data"
            open={isModalUpdateOpen}
            onClose={() => setIsModalUpdateOpen(false)}
            size="small"
        >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Tanggal"
                    format="dd/MM/yyyy"
                    value={new Date(updateDataReq.date)}
                    onChange={(value: Date | null) => {
                        if (value) {
                            setUpdateDataReq({
                                ...updateDataReq,
                                date: moment(value).format("YYYY-MM-DD")
                            })
                        }
                    }}
                    slotProps={{
                        textField: {
                            size: "small",
                            fullWidth: true
                        }
                    }}
                    sx={{ background: "white" }}
                />
            </LocalizationProvider>
            <TextField
                size="small"
                id="documentNumber"
                label="No Dokumen"
                fullWidth
                value={updateDataReq.documentNumber}
                onChange={handleUpdateOnChange}
                onKeyDown={handleUpdateOnEnter}
            />
            <TextField
                size="small"
                id="description"
                label="Keterangan"
                fullWidth
                value={updateDataReq.description}
                onChange={handleUpdateOnChange}
                onKeyDown={handleUpdateOnEnter}
            />
            <Button
                variant="contained"
                onClick={doUpdateData}
                disabled={!isUpdateReady()}
            >
                Simpan
            </Button>
        </CustomModal>
    }

    const displayDeleteModal = () => {
        return <CustomModal
            title="Hapus Data"
            open={isModalDeleteOpen}
            onClose={() => setIsModalDeleteOpen(false)}
            size="small"
        >
            <Typography
                fontWeight="bold"
            >
                Yakin hapus data ini ?
            </Typography>
            <Button
                variant="contained"
                color="error"
                onClick={doDeleteData}
            >
                Hapus
            </Button>
        </CustomModal>
    }

    const handleUpdateOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setUpdateDataReq({
            ...updateDataReq,
            [e.target.id]: e.target.value
        })
    }

    const handleUpdateOnEnter = (e: KeyboardEvent<HTMLDivElement>): void => {
        if (isUpdateReady()) {
            if (e.key === "Enter") {
                doUpdateData()
            }
        }
    }

    const isUpdateReady = (): boolean => {
        return updateDataReq.id !== "" &&
            updateDataReq.date !== "" &&
            updateDataReq.documentNumber !== "" &&
            updateDataReq.description !== ""
    }

    return <MainPage
        title="Data"
    >
        {displayUpdateModal()}
        {displayDeleteModal()}
        <SearchControl
            getDatasReq={getDatasReq}
            categorys={categorys}
            lockers={lockers}
            setGetDatasReq={(value: GetDatasReq) => setGetDatasReq(value)}
            doSearch={() => loadData()}
        />
        <br />
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
                            Tanggal
                        </TableCell>
                        <TableCell
                            sx={{ fontWeight: "bold" }}
                            align="center"
                        >
                            No Dokumen
                        </TableCell>
                        <TableCell
                            sx={{ fontWeight: "bold" }}
                            align="center"
                        >
                            Keterangan
                        </TableCell>
                        <TableCell
                            sx={{ fontWeight: "bold" }}
                            align="center"
                        >
                            Kategori
                        </TableCell>
                        <TableCell
                            sx={{ fontWeight: "bold" }}
                            align="center"
                        >
                            Loker
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
                    {datas.length > 0 ?
                        datas.map((data, index) =>
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
                                    {moment(data.date, "YYYY-MM-DD").format("DD/MM/YYYY")}
                                </TableCell>
                                <TableCell
                                    align="center"
                                >
                                    {data.documentNumber}
                                </TableCell>
                                <TableCell>
                                    {data.description}
                                </TableCell>
                                <TableCell
                                    align="center"
                                >
                                    {categorys.find((category) => category.id === data.categoryId)?.name}
                                </TableCell>
                                <TableCell
                                    align="center"
                                >
                                    {lockers.find((locker) => locker.id === data.lockerId)?.name}
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
                                            title="Download"
                                            arrow
                                        >
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={() => handleDownload(data)}
                                            >
                                                <Download />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip
                                            title="Edit"
                                            arrow
                                        >
                                            <Button
                                                variant="contained"
                                                onClick={() => {
                                                    setUpdateDataReq({
                                                        id: data.id,
                                                        date: data.date,
                                                        documentNumber: data.documentNumber,
                                                        description: data.description
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
                                                    setDeleteDataReq({
                                                        id: data.id
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
                                colSpan={7}
                                align="center"
                            >
                                No Data Available
                            </TableCell>
                        </TableRow>}
                </TableBody>
            </Table>
        </TableContainer>
    </MainPage>
}