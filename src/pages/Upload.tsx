import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import moment from "moment"
import { ChangeEvent, useState } from "react"
import MainPage from "../components/MainPage"
import BasicConstant from "../types/BasicConstant"

export default function Upload() {
    const [request, setRequest] = useState<{
        tanggal: string
        noDokumen: string
        keterangan: string
        kategori: string
        file: File | undefined
    }>({
        tanggal: moment().format("YYYY-MM-DD"),
        noDokumen: "",
        keterangan: "",
        kategori: "",
        file: undefined
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<any>): void => {
        const { name, value } = e.target

        if (e.target instanceof HTMLInputElement && e.target.type === "file") {
            const fileInput = e.target as HTMLInputElement
            const selectedFile = fileInput.files ? fileInput.files[0] : null
            setRequest({
                ...request,
                [name]: selectedFile
            })
        } else {
            setRequest({
                ...request,
                [name]: value
            })
        }
    }

    return <MainPage
        title="Upload"
    >
        <Stack
            display="flex"
            flexDirection="row"
            columnGap={2}
        >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Tanggal"
                    format="dd/MM/yyyy"
                    value={new Date(request.tanggal)}
                    onChange={(value: Date | null) => {
                        if (value) {
                            setRequest({
                                ...request,
                                tanggal: moment(value).format("YYYY-MM-DD")
                            })
                        }
                    }}
                    slotProps={{
                        textField: {
                            size: "small",
                            fullWidth: true
                        }
                    }}
                />
            </LocalizationProvider>
            <TextField
                name="noDokumen"
                label="No Dokumen"
                size="small"
                value={request.noDokumen}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                name="keterangan"
                label="Keterangan"
                size="small"
                value={request.keterangan}
                onChange={handleChange}
                fullWidth
            />
            <FormControl fullWidth>
                <InputLabel id="label-kategori" size="small">Kategori</InputLabel>
                <Select
                    name="kategori"
                    label="Kategori"
                    size="small"
                    value={request.kategori}
                    onChange={handleChange}
                    labelId="label-kategori"
                >
                    <MenuItem value={BasicConstant.KATEGORI_KASBON}>{BasicConstant.KATEGORI_KASBON.toUpperCase()}</MenuItem>
                </Select>
            </FormControl>
            <input
                type="file"
                id="file-upload"
                name="file"
                onChange={handleChange}
                style={{ display: "none" }}
            />
            <label htmlFor="file-upload" style={{ width: "100%", height: "100%" }}>
                <Button
                    variant="contained"
                    fullWidth
                >
                    Choose File
                </Button>
            </label>
            <Button
                variant="contained"
                fullWidth
                onClick={() => console.log(request)}
            >
                Upload
            </Button>
        </Stack>
        <Typography>{request.file ? request.file.name : "No File Uploaded"}</Typography>
    </MainPage>
}