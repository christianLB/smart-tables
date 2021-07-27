import { tableFetch } from "./tablefetch"

export const products = async () => {
    return tableFetch('https://fakerapi.it/api/v1/products?_quantity=15&_taxes=12&_categories_type=uuid')
}

export default async function handler(req, res) {

    res.status(200).json(products())
}

