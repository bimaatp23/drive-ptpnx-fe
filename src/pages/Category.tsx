import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useState } from "react"
import { finalize } from "rxjs"
import { setNotification } from "../Util"
import CustomModal from "../components/CustomModal"
import MainPage from "../components/MainPage"
import { BaseResp } from "../types/BaseResp"
import { Category as CategoryType } from "../types/category/Category"
import { CreateCategoryReq } from "../types/category/CreateCategoryReq"
import { GetCategorysResp } from "../types/category/GetCategorysResp"
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory"

export default function Category() {
    const useCaseFactory: UseCaseFactory = useMemo(() => new UseCaseFactoryImpl(), [])
    const [categorys, setCategorys] = useState<CategoryType[]>([])
    const [createCategoryReq, setCreateCategoryReq] = useState<CreateCategoryReq>({
        name: ""
    })
    const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false)

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
                value={createCategoryReq.name}
                onChange={handleCreateOnChange}
                onKeyDown={handleCreateOnEnter}
            />
            <Button
                variant="contained"
                onClick={doCreateCategory}
            >
                Tambah
            </Button>
        </CustomModal>
    }

    const handleCreateOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setCreateCategoryReq({
            ...createCategoryReq,
            [e.target.id]: e.target.value
        })
    }

    const handleCreateOnEnter = (e: KeyboardEvent<HTMLDivElement>): void => {
        if (e.key === "Enter") {
            doCreateCategory()
        }
    }

    return <MainPage
        title="Kategori"
        headElement={
            <Button
                variant="contained"
                onClick={() => setIsModalCreateOpen(true)}
            >
                Tambah Kategori
            </Button>
        }
    >
        {displayCreateModal()}
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