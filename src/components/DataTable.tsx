import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import moment from "moment"
import { useMemo, useState } from "react"
import { setNotification } from "../Util"
import { Data } from "../types/data/Data"
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory"
import CustomModal from "./CustomModal"

interface Props {
    datas: Data[]
}



export default function DataTable(props: Props) {
    const useCaseFactory: UseCaseFactory = useMemo(() => new UseCaseFactoryImpl(), [])

    const [isEditModalOpen, setIsModalEditOpen] = useState<boolean>(false)

    const displayEditModal = () => {
        return <CustomModal
            open={isEditModalOpen}
            onClose={() => setIsModalEditOpen(false)}
        >
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
        </CustomModal>
    }

    const handleDownload = (data: Data): void => {
        const { id, file, documentNumber } = data
        useCaseFactory.useDownloadFileUseCase().execute(id)
            .subscribe({
                next: (response: string) => {
                    console.log(response)
                    let downloadLink = document.createElement("a")
                    downloadLink.href = response
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

    return <TableContainer component={Paper}>
        {displayEditModal()}
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
                                {moment(data.date, "YYYY-MM-DD").format("DD/MM/YYYY")}
                            </TableCell>
                            <TableCell>
                                {data.documentNumber}
                            </TableCell>
                            <TableCell>
                                {data.description}
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    onClick={() => setIsModalEditOpen(true)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => handleDownload(data)}
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