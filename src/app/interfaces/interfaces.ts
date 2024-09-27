export interface Group {
    id: string,
    title: string,
    description: string,
    users: string[],
    expanses: Expanse[],
    categories: string[]
}

export interface Expanse {
    id: string,
    title: string,
    description: string,
    amount: number,
    category: string,
    participants: string[]
}

export interface User {
    id: string,
    name: string,
    groups: string[],
    amount: number
}