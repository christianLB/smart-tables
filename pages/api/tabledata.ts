import { tableFetch } from './tablefetch';

export const tableData = async () => {
    return tableFetch('https://fakerapi.it/api/v1/persons?_quantity=10&_gender=male&_birthday_start=2005-01-01')
}

export default async function handler(req, res) {

    res.status(200).json(tableData())
}

