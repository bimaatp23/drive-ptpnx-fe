import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import jsrsasign from "jsrsasign"
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory"

export interface BaseService {
    httpGet(url: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>>
    httpPost(url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>>
    httpPut(url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>>
    httpDelete(url: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>>
    httpPostBasic(url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>>
}

export class BaseServiceImpl implements BaseService {
    useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl()

    readonly endPoint = process.env.REACT_APP_API_ENDPOINT

    now = Math.floor(Date.now() / 1000)
    exp = this.now + 10

    generatedJwt = "Bearer " + jsrsasign.KJUR.jws.JWS.sign("HS256", { alg: "HS256" }, { ...this.useCaseFactory.useSessionUseCase().get(), exp: this.exp }, process.env.REACT_APP_SECRET_KEY)

    httpGet(url: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> {
        const defaultConfig: AxiosRequestConfig<any> = {
            ...config,
            headers: {
                Authorization: this.generatedJwt
            }
        }
        return axios.get(this.endPoint + url, defaultConfig)
    }

    httpPost(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>> {
        const defaultConfig: AxiosRequestConfig<any> = {
            ...config,
            headers: {
                Authorization: this.generatedJwt,
                "Content-Type": "multipart/form-data"
            }
        }
        return axios.post(this.endPoint + url, data, defaultConfig)
    }

    httpPut(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>> {
        const defaultConfig: AxiosRequestConfig<any> = {
            ...config,
            headers: {
                Authorization: this.generatedJwt,
                "Content-Type": "multipart/form-data"
            }
        }
        return axios.put(this.endPoint + url, data, defaultConfig)
    }
    
    httpDelete(url: string, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>> {
        const defaultConfig: AxiosRequestConfig<any> = {
            ...config,
            headers: {
                Authorization: this.generatedJwt,
                "Content-Type": "multipart/form-data"
            }
        }
        return axios.delete(this.endPoint + url, defaultConfig)
    }

    httpPostBasic(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>> {
        const defaultConfig: AxiosRequestConfig<any> = {
            ...config,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        return axios.post(this.endPoint + url, data, defaultConfig)
    }
}