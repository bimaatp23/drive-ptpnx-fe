import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import DataTable from "../components/DataTable"
import MainPage from "../components/MainPage"
import SearchControl from "../components/SearchControl"
import { Data } from "../types/data/Data"
import { GetDatasReq } from "../types/data/GetDatasReq"
import { GetDatasResp } from "../types/data/GetDatasResp"
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory"

export default function DataPage() {
    const { kategori } = useParams()
    const useCaseFactory: UseCaseFactory = useMemo(() => new UseCaseFactoryImpl(), [])
    const currentDate: Date = useMemo(() => new Date(), [])
    const aYearAgo: Date = useMemo(() => {
        const result: Date = new Date()
        result.setFullYear(currentDate.getFullYear() - 1)
        return result
    }, [currentDate])
    const [datas, setDatas] = useState<Data[]>([])
    const [getDatasReq, setGetDatasReq] = useState<GetDatasReq>({
        kategori: kategori as string,
        tanggalFrom: aYearAgo.toISOString().split("T")[0],
        tanggalUntil: currentDate.toISOString().split("T")[0],
        keterangan: "",
        noDokumen: ""
    })

    const [isStatic, setIsStatic] = useState<boolean>(false)
    useEffect(() => setIsStatic(true), [])

    useEffect(() => {
        if (isStatic) {
            const firstGetDatasReq: GetDatasReq = {
                kategori: kategori as string,
                tanggalFrom: aYearAgo.toISOString().split("T")[0],
                tanggalUntil: currentDate.toISOString().split("T")[0],
                keterangan: "",
                noDokumen: ""
            }
            useCaseFactory.createGetDatasUseCase().execute(firstGetDatasReq)
                .subscribe({
                    next: (response: GetDatasResp) => {
                        if (response.errorSchema.errorCode === 200) {
                            setDatas(response.outputSchema)
                        }
                    },
                    error: (err) => {
                        console.error(err)
                    }
                })
        }
    }, [isStatic, useCaseFactory, kategori, currentDate, aYearAgo])

    const loadData = (): void => {
        useCaseFactory.createGetDatasUseCase().execute(getDatasReq)
            .subscribe({
                next: (response: GetDatasResp) => {
                    if (response.errorSchema.errorCode === 200) {
                        setDatas(response.outputSchema)
                    }
                },
                error: (err) => {
                    console.error(err)
                }
            })
    }

    return <MainPage
        title={kategori as string}
    >
        <SearchControl
            getDatasReq={getDatasReq}
            setGetDatasReq={(value: GetDatasReq) => setGetDatasReq(value)}
            doSearch={() => loadData()}
        />
        <br />
        <DataTable
            datas={datas}
        />
    </MainPage>
}