import { Add, Delete, Edit } from "@mui/icons-material"
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useState } from "react"
import { finalize } from "rxjs"
import { setNotification } from "../Util"
import CustomModal from "../components/CustomModal"
import MainPage from "../components/MainPage"
import { BaseResp } from "../types/BaseResp"
import { CreateCategoryReq } from "../types/category/CreateCategoryReq"
import { DeleteCategoryReq } from "../types/category/DeleteCategoryReq"
import { GetCategory, GetCategorysResp } from "../types/category/GetCategorysResp"
import { UpdateCategoryReq } from "../types/category/UpdateCategoryReq"
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory"

export default function Category() {
    const useCaseFactory: UseCaseFactory = useMemo(() => new UseCaseFactoryImpl(), [])
    const [categorys, setCategorys] = useState<GetCategory[]>([])
    const [createCategoryReq, setCreateCategoryReq] = useState<CreateCategoryReq>({
        name: ""
    })
    const [updateCategoryReq, setUpdateCategoryReq] = useState<UpdateCategoryReq>({
        id: "",
        name: ""
    })
    const [deleteCategoryReq, setDeleteCategoryReq] = useState<DeleteCategoryReq>({
        id: ""
    })
    const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false)
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false)
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false)

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
        }
    }, [isStatic, useCaseFactory])

    const getCategoryList = (): void => {
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
    }

    const doCreateCategory = (): void => {
        useCaseFactory.useCreateCategoryUseCase().execute(createCategoryReq)
            .pipe(
                finalize(() => {
                    setIsModalCreateOpen(false)
                    getCategoryList()
                })
            )
            .subscribe({
                next: (response: BaseResp) => {
                    if (response.errorSchema.errorCode === 200) {
                        setNotification({
                            icon: "success",
                            message: response.errorSchema.errorMessage
                        })
                        setCreateCategoryReq({
                            name: ""
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

    const doUpdateCategory = (): void => {
        useCaseFactory.useUpdateCategoryUseCase().execute(updateCategoryReq)
            .pipe(
                finalize(() => {
                    setIsModalUpdateOpen(false)
                    getCategoryList()
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

    const doDeleteCategory = (): void => {
        useCaseFactory.useDeleteCategoryUseCase().execute(deleteCategoryReq)
            .pipe(
                finalize(() => {
                    setIsModalDeleteOpen(false)
                    getCategoryList()
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
            title="Tambah Kategori"
            open={isModalCreateOpen}
            onClose={() => setIsModalCreateOpen(false)}
            size="small"
        >
            <TextField
                size="small"
                id="name"
                label="Nama"
                fullWidth
                value={createCategoryReq.name}
                onChange={handleCreateOnChange}
                onKeyDown={handleCreateOnEnter}
            />
            <Button
                variant="contained"
                onClick={doCreateCategory}
                disabled={!isCreateReady()}
            >
                Tambah
            </Button>
        </CustomModal>
    }

    const displayUpdateModal = () => {
        return <CustomModal
            title="Edit Kategori"
            open={isModalUpdateOpen}
            onClose={() => setIsModalUpdateOpen(false)}
            size="small"
        >
            <TextField
                size="small"
                id="name"
                label="Nama"
                fullWidth
                value={updateCategoryReq.name}
                onChange={handleUpdateOnChange}
                onKeyDown={handleUpdateOnEnter}
            />
            <Button
                variant="contained"
                onClick={doUpdateCategory}
                disabled={!isUpdateReady()}
            >
                Simpan
            </Button>
        </CustomModal>
    }

    const displayDeleteModal = () => {
        return <CustomModal
            title="Hapus Kategori"
            open={isModalDeleteOpen}
            onClose={() => setIsModalDeleteOpen(false)}
            size="small"
        >
            <Typography
                fontWeight="bold"
            >
                Yakin hapus kategori ini ?
            </Typography>
            <Button
                variant="contained"
                color="error"
                onClick={doDeleteCategory}
            >
                Hapus
            </Button>
        </CustomModal>
    }

    const handleCreateOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setCreateCategoryReq({
            ...createCategoryReq,
            [e.target.id]: e.target.value
        })
    }

    const handleUpdateOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setUpdateCategoryReq({
            ...updateCategoryReq,
            [e.target.id]: e.target.value
        })
    }

    const handleCreateOnEnter = (e: KeyboardEvent<HTMLDivElement>): void => {
        if (isCreateReady()) {
            if (e.key === "Enter") {
                doCreateCategory()
            }
        }
    }

    const handleUpdateOnEnter = (e: KeyboardEvent<HTMLDivElement>): void => {
        if (isUpdateReady()) {
            if (e.key === "Enter") {
                doUpdateCategory()
            }
        }
    }

    const isCreateReady = (): boolean => {
        return createCategoryReq.name !== ""
    }

    const isUpdateReady = (): boolean => {
        return updateCategoryReq.id !== "" &&
            updateCategoryReq.name !== ""
    }

    return <MainPage
        title="Kategori"
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
                            Nama
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
                    {categorys.length > 0 ?
                        categorys.map((category, index) =>
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
                                    {category.name}
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
                                                    setUpdateCategoryReq({
                                                        id: category.id,
                                                        name: category.name
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
                                                    setDeleteCategoryReq({
                                                        id: category.id
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
                                colSpan={4}
                                align="center"
                            >
                                No Category Available
                            </TableCell>
                        </TableRow>}
                </TableBody>
            </Table>
        </TableContainer>
    </MainPage>
}