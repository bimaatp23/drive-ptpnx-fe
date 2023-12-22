import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import moment from "moment"
import { useEffect, useMemo, useState } from "react"
import { setNotification } from "../Util"
import CustomModal from "../components/CustomModal"
import ImageViewer from "../components/ImageViewer"
import MainPage from "../components/MainPage"
import SearchControl from "../components/SearchControl"
import { Category } from "../types/category/Category"
import { GetCategorysResp } from "../types/category/GetCategorysResp"
import { Data as DataType } from "../types/data/Data"
import { GetDatasReq } from "../types/data/GetDatasReq"
import { GetDatasResp } from "../types/data/GetDatasResp"
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
    const [isModalPreviewOpen, setIsModalPreviewOpen] = useState<boolean>(false)
    const [filePreview, setFilePreview] = useState<File | undefined>(undefined)

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

    const handlePreview = (data: DataType): void => {
        const { id } = data
        useCaseFactory.useDownloadFileUseCase().execute(id)
            .subscribe({
                next: (response: File) => {
                    setFilePreview(response)
                },
                error: (error) => {
                    setNotification({
                        icon: "error",
                        message: error.response.data.errorSchema?.errorMessage ?? error.response.statusText
                    })
                }
            })
    }

    const displayPreviewModal = () => {
        return <CustomModal
            title="Preview"
            open={isModalPreviewOpen}
            onClose={() => setIsModalPreviewOpen(false)}
            size="large"
        >
            {filePreview ?
                <Stack
                    maxWidth="100%"
                    maxHeight="calc(100vh - 12rem)"
                    border={2}
                    borderColor="#808080"
                >
                    {filePreview.type.startsWith("image/") ? <ImageViewer file={filePreview} /> : <Typography>PDF Viewer is under maintenance</Typography>}
                </Stack>
                :
                <Typography>File Loading ...</Typography>
            }
        </CustomModal>
    }

    return <MainPage
        title="Data"
    >
        <SearchControl
            getDatasReq={getDatasReq}
            categorys={categorys}
            lockers={lockers}
            setGetDatasReq={(value: GetDatasReq) => setGetDatasReq(value)}
            doSearch={() => loadData()}
        />
        <br />
        {displayPreviewModal()}
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
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                handlePreview(data)
                                                setIsModalPreviewOpen(true)
                                            }}
                                        >
                                            Preview
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleDownload(data)}
                                        >
                                            Download
                                        </Button>
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