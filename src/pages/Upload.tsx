import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import moment from "moment"
import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { setNotification } from "../Util"
import ImageViewer from "../components/ImageViewer"
import MainPage from "../components/MainPage"
import PDFViewer from "../components/PDFViewer"
import { BaseResp } from "../types/BaseResp"
import { Category } from "../types/category/Category"
import { GetCategorysResp } from "../types/category/GetCategorysResp"
import { UploadDataReq } from "../types/data/UploadDataReq"
import { GetLockersResp } from "../types/locker/GetLockersResp"
import { Locker } from "../types/locker/Locker"
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory"

export default function Upload() {
    const useCaseFactory: UseCaseFactory = useMemo(() => new UseCaseFactoryImpl(), [])
    const [uploadDataReq, setUploadDataReq] = useState<UploadDataReq>({
        date: moment().format("YYYY-MM-DD"),
        documentNumber: "",
        description: "",
        categoryId: "",
        lockerId: "",
        file: undefined
    })
    const [fileValue, setFileValue] = useState<string>("")
    const [categorys, setCategorys] = useState<Category[]>([])
    const [lockers, setLockers] = useState<Locker[]>([])

    const [isStatic, setIsStatic] = useState<boolean>(false)
    useEffect(() => setIsStatic(true), [])

    useEffect(() => {
        if (isStatic) {
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
    }, [isStatic, useCaseFactory])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<any>): void => {
        const { name, value } = e.target
        setUploadDataReq({
            ...uploadDataReq,
            [name]: value
        })
    }

    const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
        try {
            const input = e.target
            const { name, files, value } = input
            if (!files || files.length === 0) {
                return
            }
            const selectedFile = files[0]
            const allowedTypes: string[] = ["application/pdf", "image/png", "image/jpeg", "image/jpg"]
            if (allowedTypes.includes(selectedFile.type)) {
                setUploadDataReq({
                    ...uploadDataReq,
                    [name]: selectedFile
                })
                setFileValue(value)
            } else {
                setNotification({
                    icon: "info",
                    message: `Hanya file PDF, PNG, JPEG, atau JPG yang diizinkan. Anda memilih: ${selectedFile.type}`
                })
                setUploadDataReq({
                    ...uploadDataReq,
                    [name]: undefined
                })
                setFileValue("")
            }
        } catch (error) {
            console.error("Error handling file:", error)
        }
    }

    const handleUpload = (): void => {
        useCaseFactory.useUploadDataUseCase().execute(uploadDataReq)
            .subscribe({
                next: (response: BaseResp) => {
                    setNotification({
                        icon: "success",
                        message: response.errorSchema.errorMessage
                    })
                    window.location.assign("/data")
                },
                error: (error) => {
                    setNotification({
                        icon: "error",
                        message: error.response.data.errorSchema?.errorMessage ?? error.response.statusText
                    })
                }
            })
    }

    return <MainPage
        title="Upload"
    >
        <Stack
            display="flex"
            flexDirection="row"
            columnGap={2}
            mb={1}
        >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Tanggal"
                    format="dd/MM/yyyy"
                    value={new Date(uploadDataReq.date)}
                    onChange={(value: Date | null) => {
                        if (value) {
                            setUploadDataReq({
                                ...uploadDataReq,
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
                name="documentNumber"
                label="No Dokumen"
                size="small"
                value={uploadDataReq.documentNumber}
                onChange={handleChange}
                fullWidth
                sx={{ background: "white" }}
            />
            <TextField
                name="description"
                label="Keterangan"
                size="small"
                value={uploadDataReq.description}
                onChange={handleChange}
                fullWidth
                sx={{ background: "white" }}
            />
            <FormControl fullWidth>
                <InputLabel id="label-category" size="small">Kategori</InputLabel>
                <Select
                    name="categoryId"
                    label="Kategori"
                    size="small"
                    value={uploadDataReq.categoryId}
                    onChange={handleChange}
                    labelId="label-category"
                    sx={{ background: "white" }}
                >
                    {categorys.map((category) => {
                        return <MenuItem value={category.id}>{category.name}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="label-locker" size="small">Loker</InputLabel>
                <Select
                    name="lockerId"
                    label="Loker"
                    size="small"
                    value={uploadDataReq.lockerId}
                    onChange={handleChange}
                    labelId="label-locker"
                    sx={{ background: "white" }}
                >
                    {lockers.map((locker) => {
                        return <MenuItem value={locker.id}>{locker.name}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <TextField
                id="file-upload"
                type="file"
                name="file"
                size="small"
                value={fileValue}
                onChange={handleFile}
                fullWidth
                sx={{ background: "white" }}
            />
            <Button
                variant="contained"
                fullWidth
                onClick={handleUpload}
            >
                Upload
            </Button>
        </Stack>
        {uploadDataReq.file ?
            <Stack
                maxWidth="100%"
                maxHeight="calc(100vh - 12rem)"
                border={2}
                borderColor="#808080"
            >
                {uploadDataReq.file.type.startsWith("image/") ? <ImageViewer file={uploadDataReq.file} /> : <PDFViewer file={uploadDataReq.file} />}
            </Stack>
            :
            <Typography>No File Uploaded</Typography>
        }
    </MainPage>
}