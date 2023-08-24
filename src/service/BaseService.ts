import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { UseCaseFactory, UseCaseFactoryImpl } from '../usecase/UseCaseFactory'

export interface BaseService {
    httpGet(url: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>>
}

export class BaseServiceImpl implements BaseService {
    useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl()

    httpGet(url: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> {
        const defaultConfig: AxiosRequestConfig<any> = {
            ...config,
            headers: {
                Authorization: 'Bearer ' + this.useCaseFactory.createSessionUseCase().getToken()
            }
        }
        return axios.get(url, defaultConfig)
    }
}