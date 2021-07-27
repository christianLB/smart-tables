import { tableFetch } from "./tablefetch"

export const users = async () => {
    return tableFetch('https://fakerapi.it/api/v1/users?_quantity=10&_gender=male')
}

export default async function handler(req, res) {

    res.status(200).json(users())
}

