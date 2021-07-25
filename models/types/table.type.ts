export type Breakpoints = "xs" | "sm" | "md" | "lg" | "xl"
export type rowId = string | number

export interface ResponsiveCellsIndexes {
    breakpoints: Breakpoints[]
    headerName?: string
}

export interface PaginationParams {
    currentPage: number
    perPage: number
    totalResults: number
}

export interface TableCellData {
    text?: string,
    component?: JSX.Element,
    className?: string,
    info?: string,
    responsive?: {//legacy, should be removed when tables in the admin stop passing responsive info like this.
        headerName?: string
        breakpoints?: Breakpoints[]
    }
    breakpoints?: Breakpoints[],
    invertRender?: boolean;
    onClick?: () => void
}

export interface TableHeaderCellData extends TableCellData {
    sortAttribute?: string,
    sortable?: boolean,
}

export interface TableRowData {
    rowLinkUrl?: string,
    cells: TableCellData[],
    markedForDeletion?: boolean,
    className?: string,
    rowEntity?: any,
    rowId?: rowId, //unique row identifier for smart table row selection
    clickHandler?: () => void,
    deleteHandler?: () => void
}

export interface TableColumnConfig {
    headerName?: string,
    breakpoints?: string,
    metric?: string,
    decimalPlaces?: number,
    format?: string,
    invertDelta?: boolean,
    type?: 'value' | 'text' | 'compare' | 'empty',
    computedValue?: (id: string, value: any) => any
}