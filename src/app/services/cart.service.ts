import { Injectable } from '@angular/core';
import { Product } from 'shared/interfaces';

@Injectable()
export class CartService {
    private cartItems: Product[] = [];
    private subtotal: number = 0
    private total: number | string = 0

    constructor() {
        this.loadCartItems();
        this.getTotalSubtotal()
    }

    addToCart(item: Product) {
        item.amount = 1
        item.subtotal = item.price
        this.cartItems.push(item);
        this.saveCartItems();
    }

    removeFromCart(id: number) {
        this.cartItems = this.cartItems.filter(product => product.id != id);
        this.saveCartItems();
        console.log(this.getCartItems.length)
    }

    updateItem(id: number){
        const item = this.cartItems.filter(product => product.id == id)[0]
        item.subtotal = (item.amount * item.price).toFixed(2)
        this.saveCartItems()
    }

    existsInCart(id: number) {
        return this.cartItems.some(product => product.id == id)
    }

    getTotalSubtotal(){
        this.subtotal = 0.0
        this.total = 0.0
        this.cartItems.forEach(product => this.subtotal += Number(product.subtotal))
        this.total = (this.subtotal * 0.5).toFixed(2);
    }

    cleanCart(){
        this.cartItems = []
        this.saveCartItems()
    }

    get getCartItems() {
        return this.cartItems;
    }

    get getTotal(){
        return this.total;
    }

    get getSubtotal(){
        return this.subtotal;
    }

    get invalidItems(){
        return this.cartItems.some(product => product.amount < 1 || product.amount > product.stock)
    }

    private saveCartItems() {
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        this.getTotalSubtotal()
    }

    private loadCartItems() {
        const data = localStorage.getItem('cartItems');
        if (data) {
            this.cartItems = JSON.parse(data);
        }
    }
}