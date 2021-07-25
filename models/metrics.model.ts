import { mapKeys, keys, snakeCase, camelCase, assignIn } from 'lodash'
import { buildTableRow } from '../components/table/smart-table'
import { TableColumnConfig } from './types/table.type'

export class MetricsModelBase {
    constructor(data: any) {
        keys(data).map(metricName => this[camelCase(metricName)] = data[metricName])
    }
    get metrics() { return [...Object.keys(this)] }
    get model() { return typeof this }
    get toJson() { return mapKeys(this, (value, key) => snakeCase(key)) }

    compareTo(compareModel: MetricsModelBase) {
        const compareMap = assignIn({}, compareModel) //clone the object to compare with

        keys(this).map(metricName => {// merge it with the original (current)
            compareMap[metricName] = { current: this[metricName], compare: compareModel[metricName] }
        })
        return compareMap //returns a new mapped object with both current and compare values.
    }
    tableRow(columns: TableColumnConfig[], className: string, rowKey: string, rowLinkUrl): StoopidTableRow {
        return buildTableRow(this, columns, rowKey, className, rowLinkUrl)
    }
}
