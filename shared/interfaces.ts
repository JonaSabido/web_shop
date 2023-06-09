export interface TimeStamps {
    created_at?: string | Date;
    updated_at?: string | Date;
}

export interface DialogDataProduct {
    id: number;
    type: 'new' | 'edit'
  }

export interface ListWCursor<T> {
    data: {
        current_page: number;
        data: T[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        next_page_url: string;
        prev_page_url: string;
        to: number;
        total: number;
    };
    success: boolean;
    message: any[];
    cursor: string;
}

export interface SimpleList<T>{
    success: boolean,
    data: T[],
    message: any
}

export interface Model extends TimeStamps {
    id: number;
    arraySearch?: string[];
}
export interface Login {
    nick: string,
    password: string
}

export interface Register {
    name: string,
    last_name: string,
    nick: string,
    email: string,
    password: string,
    active: boolean
}

export interface LoginSuccess {
    accessToken: string
}

export interface Product extends Model {
    id_category: number;
    name:        string;
    description: null;
    price:       number;
    stock:       number;
    url:         string;
    active:      boolean | number;
    category?:   Category;

    amount:     number
    subtotal:   number | string
}

export interface Profile extends Model {
    name: string,
}

export interface Category extends Model {
    name: string,
    active: boolean,
    products: Product[],
}

export interface User extends Model {
    name: string;
    last_name: string;
    nick: string;
    email: string;
    active: boolean | number;
    id_profile: number;
    password: string;
    o_profile?: Profile;
}

export interface SaleDetail extends Model{
    id_sale: number;
    id_product: number;
    amount: number;
    total: number;
}

export interface Sale extends Model{
    id_user: number;
    total: number | string;
    sale_date: Date | string;
    details: SaleDetail[]
}
