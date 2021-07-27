import { tableFetch } from "./tablefetch"

export const covid = async (params: any) => {
    return tableFetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${params.country}`)
}

export default async function handler(req, res) {
    if (req.params.country) {
        res.status(200).json(covid(req.params.country))
    }
}

