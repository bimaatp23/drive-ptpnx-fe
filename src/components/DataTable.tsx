import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import moment from "moment"
import { useMemo } from "react"
import { setNotification } from "../Util"
import { Data } from "../types/data/Data"
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory"

interface Props {
    datas: Data[]
}

export default function DataTable(props: Props) {
    const useCaseFactory: UseCaseFactory = useMemo(() => new UseCaseFactoryImpl(), [])

    const handleDownload = (filename: string): void => {
        useCaseFactory.createDownloadFileUseCase().execute(filename.split(".")[0])
            .subscribe({
                next: (response: string) => {
                    console.log(response)
                    let downloadLink = document.createElement("a")
                    downloadLink.href = response
                    downloadLink.download = filename
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

    return <TableContainer component={Paper}>
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
                        Action
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.datas.length > 0 ?
                    props.datas.map((data, index) =>
                        <TableRow key={index}>
                            <TableCell
                                sx={{ fontWeight: "bold" }}
                                align="center"
                            >
                                {index + 1}
                            </TableCell>
                            <TableCell>
                                {moment(data.tanggal, "YYYY-MM-DD").format("DD/MM/YYYY")}
                            </TableCell>
                            <TableCell>
                                {data.noDokumen}
                            </TableCell>
                            <TableCell>
                                {data.keterangan}
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    onClick={() => handleDownload(data.file)}
                                >
                                    Download
                                </Button>
                            </TableCell>
                        </TableRow>
                    )
                    :
                    <TableRow>
                        <TableCell
                            colSpan={5}
                            align="center"
                        >
                            No Data Available
                        </TableCell>
                    </TableRow>}
            </TableBody>
        </Table>
    </TableContainer>
}