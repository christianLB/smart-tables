import { BaseModel } from "../../models/base.model"
import { MetricsModelBase } from "../../models/metrics.model"

export const tableFetch = async (url: string) => {
    const rows = []
    const headers = []

    // interface ApiMetricsJson {
    //     address: any
    //     birthday: string
    //     email: string
    //     firstname: string
    //     gender: string
    //     image: string
    //     lastname: string
    //     phone: string
    //     website: string
    // }

    class ApiMetricsModel extends MetricsModelBase {
        // constructor(data: ApiMetricsJson) {
        constructor(data: any) {
            super(data)
        }
    }

    class tableModel extends BaseModel {
        _rows: ApiMetricsModel[] = []

        constructor(data: any[]) {
            super(data)
            data?.forEach(metrics => this._rows.push(new ApiMetricsModel(metrics)))
        }
    }

    //const url = 'https://fakerapi.it/api/v1/persons?_quantity=10&_gender=male&_birthday_start=2005-01-01'
    const fetchData = await fetch(url)
    const json = await fetchData.json()
    const data = json.data

    const model = new tableModel(data)
    return { rows: model.rows, headers: model.headers }
}