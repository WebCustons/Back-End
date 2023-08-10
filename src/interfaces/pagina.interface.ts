import { TAdvertAll } from "./advert.interfaces";



export interface IPagination {
    prevPage: string | null,
    nextPage: string | null,
    count: number | null,
    data: TAdvertAll
}