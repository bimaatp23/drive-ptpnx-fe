import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useState } from "react"
import { finalize } from "rxjs"
import { setNotification } from "../Util"
import CustomModal from "../components/CustomModal"
import MainPage from "../components/MainPage"
import { BaseResp } from "../types/BaseResp"
import { CreateLockerReq } from "../types/locker/CreateLockerReq"
import { DeleteLockerReq } from "../types/locker/DeleteLockerReq"
import { GetLockersResp } from "../types/locker/GetLockersResp"
import { Locker as LockerType } from "../types/locker/Locker"
import { UpdateLockerReq } from "../types/locker/UpdateLockerReq"
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory"

export default function Locker() {
    const useCaseFactory: UseCaseFactory = useMemo(() => new UseCaseFactoryImpl(), [])
    const [lockers, setLockers] = useState<LockerType[]>([])
    const [createLockerReq, setCreateLockerReq] = useState<CreateLockerReq>({
        name: "",
        capacity: 0
    })
    const [updateLockerReq, setUpdateLockerReq] = useState<UpdateLockerReq>({
        id: "",
        name: "",
        capacity: 0
    })
    const [deleteLockerReq, setDeleteLockerReq] = useState<DeleteLockerReq>({
        id: ""
    })
    const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false)
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false)
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false)

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

    const getLockerList = (): void => {
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

    const doCreateLocker = (): void => {
        useCaseFactory.useCreateLockerUseCase().execute(createLockerReq)
            .pipe(
                finalize(() => {
                    setIsModalCreateOpen(false)
                    getLockerList()
                })
            )
            .subscribe({
                next: (response: BaseResp) => {
                    if (response.errorSchema.errorCode === 200) {
                        setNotification({
                            icon: "success",
                            message: response.errorSchema.errorMessage
                        })
                        setCreateLockerReq({
                            name: "",
                            capacity: 0
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

    const doUpdateLocker = (): void => {
        useCaseFactory.useUpdateLockerUseCase().execute(updateLockerReq)
            .pipe(
                finalize(() => {
                    setIsModalUpdateOpen(false)
                    getLockerList()
                })
            )
            .subscribe({
                next: (response: BaseResp) => {
                    if (response.errorSchema.errorCode === 200) {
                        setNotification({
                            icon: "success",
                            message: response.errorSchema.errorMessage
                        })
                        setCreateLockerReq({
                            name: "",
                            capacity: 0
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

    const doDeleteLocker = (): void => {
        useCaseFactory.useDeleteLockerUseCase().execute(deleteLockerReq)
            .pipe(
                finalize(() => {
                    setIsModalDeleteOpen(false)
                    getLockerList()
                })
            )
            .subscribe({
                next: (response: BaseResp) => {
                    if (response.errorSchema.errorCode === 200) {
                        setNotification({
                            icon: "success",
                            message: response.errorSchema.errorMessage
                        })
                        setCreateLockerReq({
                            name: "",
                            capacity: 0
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
            title="Tambah Loker"
            open={isModalCreateOpen}
            onClose={() => setIsModalCreateOpen(false)}
        >
            <TextField
                size="small"
                id="name"
                label="Nama"
                fullWidth
                value={createLockerReq.name}
                onChange={handleCreateOnChange}
                onKeyDown={handleCreateOnEnter}
            />
            <TextField
                type="number"
                size="small"
                id="capacity"
                label="Kapasitas"
                fullWidth
                value={createLockerReq.capacity}
                onChange={handleCreateOnChange}
                onKeyDown={handleCreateOnEnter}
            />
            <Button
                variant="contained"
                onClick={doCreateLocker}
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
        >
            <TextField
                size="small"
                id="name"
                label="Nama"
                fullWidth
                value={updateLockerReq.name}
                onChange={handleUpdateOnChange}
                onKeyDown={handleUpdateOnEnter}
            />
            <TextField
                type="number"
                size="small"
                id="capacity"
                label="Kapasitas"
                fullWidth
                value={updateLockerReq.capacity}
                onChange={handleUpdateOnChange}
                onKeyDown={handleUpdateOnEnter}
            />
            <Button
                variant="contained"
                onClick={doUpdateLocker}
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
        >
            <Typography
                fontWeight="bold"
            >
                Yakin hapus loker ini ?
            </Typography>
            <Button
                variant="contained"
                color="error"
                onClick={doDeleteLocker}
            >
                Hapus
            </Button>
        </CustomModal>
    }

    const handleCreateOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setCreateLockerReq({
            ...createLockerReq,
            [e.target.id]: e.target.value
        })
    }

    const handleUpdateOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setUpdateLockerReq({
            ...updateLockerReq,
            [e.target.id]: e.target.value
        })
    }

    const handleCreateOnEnter = (e: KeyboardEvent<HTMLDivElement>): void => {
        if (e.key === "Enter") {
            doCreateLocker()
        }
    }

    const handleUpdateOnEnter = (e: KeyboardEvent<HTMLDivElement>): void => {
        if (e.key === "Enter") {
            doUpdateLocker()
        }
    }

    return <MainPage
        title="Loker"
        headElement={
            <Button
                variant="contained"
                onClick={() => setIsModalCreateOpen(true)}
            >
                Tambah Loker
            </Button>
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
                                                setUpdateLockerReq({
                                                    id: locker.id,
                                                    name: locker.name,
                                                    capacity: locker.capacity
                                                })
                                                setIsModalUpdateOpen(true)
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => {
                                                setDeleteLockerReq({
                                                    id: locker.id
                                                })
                                                setIsModalDeleteOpen(true)
                                            }}
                                        >
                                            Hapus
                                        </Button>
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
                                No Locker Available
                            </TableCell>
                        </TableRow>}
                </TableBody>
            </Table>
        </TableContainer>
    </MainPage>
}