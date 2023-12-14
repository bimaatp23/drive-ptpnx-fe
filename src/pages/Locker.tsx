import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { setNotification } from "../Util"
import MainPage from "../components/MainPage"
import { GetLockersResp } from "../types/locker/GetLockersResp"
import { Locker as LockerType } from "../types/locker/Locker"
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory"

export default function Locker() {
    const useCaseFactory: UseCaseFactory = useMemo(() => new UseCaseFactoryImpl(), [])
    const [lockers, setLockers] = useState<LockerType[]>([])

    const [isStatic, setIsStatic] = useState<boolean>(false)
    useEffect(() => setIsStatic(true), [])

    useEffect(() => {
        if (isStatic) {
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

    return <MainPage
        title="Loker"
    >
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
                            Kapasitas
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
                    {lockers.length > 0 ?
                        lockers.map((locker, index) =>
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
                                    {locker.name}
                                </TableCell>
                                <TableCell
                                    align="center"
                                >
                                    {locker.capacity}
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        )
                        :
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                align="center"
                            >
                                No Locker Available
                            </TableCell>
                        </TableRow>}
                </TableBody>
            </Table>
        </TableContainer>
    </MainPage>
}