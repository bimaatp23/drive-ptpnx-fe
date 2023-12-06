import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory"

export interface BaseService {
    httpGet(url: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>>
    httpPost(url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>>
}

export class BaseServiceImpl implements BaseService {
    useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl()

    readonly endPoint = process.env.REACT_APP_API_ENDPOINT

    httpGet(url: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> {
        const defaultConfig: AxiosRequestConfig<any> = {
            ...config,
            headers: {
                Authorization: "Bearer " + this.useCaseFactory.createSessionUseCase().getToken()
            }
        }
        return axios.get(this.endPoint + url, defaultConfig)
    }

    httpPost(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>> {
        const defaultConfig: AxiosRequestConfig<any> = {
            ...config,
            headers: {
                Authorization: "Bearer " + this.useCaseFactory.createSessionUseCase().getToken()
            }
        }
        return axios.post(this.endPoint + url, data, defaultConfig)
    }
}