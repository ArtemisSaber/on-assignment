import { ROUTES } from '../routes/routes'

export interface NavLink {
    id: string
    route: ROUTES
    label: string
    params?: any
}

export interface ArticleData {
    id: string
    content: string
}

export interface Product {
    id: string
    name: string
    category: string
    description: string
    displayPrice: number
    coverimage: string
    types: Type[]
}

export interface Type {
    id: string
    name: string
    colors: Color[]
    allSizes: string[]
}

export interface Color {
    id: string
    name: string
    images: string[]
    skus: Skus[]
}

export interface Skus {
    id: string
    size: string
    price: string
}

export interface Selectors {
    name: string
    selected: boolean
    id: string
    enabled?: boolean
}
