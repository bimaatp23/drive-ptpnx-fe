import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import moment from "moment"
import { ChangeEvent, useMemo, useState } from "react"
import { setNotification } from "../Util"
import ImageViewer from "../components/ImageViewer"
import MainPage from "../components/MainPage"
import PDFViewer from "../components/PDFViewer"
import { BaseResp } from "../types/BaseResp"
import BasicConstant from "../types/BasicConstant"
import { UploadDataReq } from "../types/data/UploadDataReq"
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory"

export default function Upload() {
    const useCaseFactory: UseCaseFactory = useMemo(() => new UseCaseFactoryImpl(), [])
    const [uploadDataReq, setUploadDataReq] = useState<UploadDataReq>({
        date: moment().format("YYYY-MM-DD"),
        documentNumber: "",
        description: "",
        category: "",
        file: undefined
    })
    const [fileValue, setFileValue] = useState<string>("")

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
        useCaseFactory.createUploadDataUseCase().execute(uploadDataReq)
            .subscribe({
                next: (response: BaseResp) => {
                    setNotification({
                        icon: "success",
                        message: response.errorSchema.errorMessage
                    })
                    window.location.assign("/" + uploadDataReq.category)
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
                <InputLabel id="label-kategori" size="small">Kategori</InputLabel>
                <Select
                    name="category"
                    label="Kategori"
                    size="small"
                    value={uploadDataReq.category}
                    onChange={handleChange}
                    labelId="label-kategori"
                    sx={{ background: "white" }}
                >
                    <MenuItem value={BasicConstant.KATEGORI_KASBON}>{BasicConstant.KATEGORI_KASBON.toUpperCase()}</MenuItem>
                    <MenuItem value={BasicConstant.KATEGORI_MEMORIAL}>{BasicConstant.KATEGORI_MEMORIAL.toUpperCase()}</MenuItem>
                    <MenuItem value={BasicConstant.KATEGORI_NERACA}>{BasicConstant.KATEGORI_NERACA.toUpperCase()}</MenuItem>
                    <MenuItem value={BasicConstant.KATEGORI_UMUM}>{BasicConstant.KATEGORI_UMUM.toUpperCase()}</MenuItem>
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