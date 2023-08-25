import { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import MainPage from '../components/MainPage'
import { Data } from '../types/data/Data'
import { GetDatasReq } from '../types/data/GetDatasReq'
import { GetDatasResp } from '../types/data/GetDatasResp'
import { UseCaseFactory, UseCaseFactoryImpl } from '../usecase/UseCaseFactory'
import SearchControl from '../components/SearchControl'
import { useParams } from 'react-router-dom'

export default function DataPage() {
    const {kategori} = useParams()
    const currentDate: Date = new Date()
    const sixMonthAgo: Date = new Date()
    sixMonthAgo.setMonth(currentDate.getMonth() - 6)
    const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl()
    const [datas, setDatas] = useState<Data[]>([])
    const [getDatasReq, setGetDatasReq] = useState<GetDatasReq>({
        kategori: kategori as string,
        tanggalFrom: sixMonthAgo.toISOString().split('T')[0],
        tanggalUntil: currentDate.toISOString().split('T')[0],
        keterangan: '',
        noDokumen: ''
    })

    useEffect(() => {
        return () => {
            loadData()
        }
    }, [true])

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
        <br/>
        <DataTable
            datas={datas}
        />
    </MainPage>
}