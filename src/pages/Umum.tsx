import { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import MainPage from '../components/MainPage'
import { Data } from '../types/data/Data'
import { GetDatasReq } from '../types/data/GetDatasReq'
import { GetDatasResp } from '../types/data/GetDatasResp'
import { UseCaseFactory, UseCaseFactoryImpl } from '../usecase/UseCaseFactory'

export default function Umum() {
    const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl()
    const [datas, setDatas] = useState<Data[]>([])
    const [getDatasReq, setGetDatasReq] = useState<GetDatasReq>({
        kategori: 'umum',
        tanggalFrom: '',
        tanggalUntil: '',
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
        title='Umum'
    >
        <DataTable
            datas={datas}
        />
    </MainPage>
}