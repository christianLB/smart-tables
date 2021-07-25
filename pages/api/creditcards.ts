import { tableFetch } from "./tablefetch"

export const creditcards = async () => {
    return tableFetch('https://fakerapi.it/api/v1/credit_cards?_quantity=7')
}

export default async function handler(req, res) {

    res.status(200).json(creditcards())
}

