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
    paidBy: string
}

export interface User {
    id: string,
    email: string,
    name: string,
    groups: string[],
    amount: number
}

export interface AuthUser {
    name?: string,
    email: string,
    password: string,
    confirmPassword?: string
}

export interface Settlement {
    value: number;
    payToUser: string;
  }

 export interface Payments {
    user: string,
    settlements: Settlement[]
 }