import { buildTableRow } from "../components/table/smart-table"
import { Breakpoints } from "./types/table.type"
import { split } from 'lodash'

const camelToText = (str) => {
    const result = str.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
}
export class BaseModel {
    _rows = []
    get columns() {
        return this._rows[0].metrics.map(metric => {
            return {
                headerName: camelToText(metric),
                metric: metric
            }
        })
    }
    get rows() {
        return this._rows.map((rowModel, rowKey) => {
            return buildTableRow(rowModel, this.columns, String(rowKey), '', '')
        })
    }
    get headers() {
        return this.columns?.map(column => ({ component: column.headerName, breakpoints: column.breakpoints?.split(',') as Breakpoints[] || null }))
    }

    constructor(parameters) {

    }
}