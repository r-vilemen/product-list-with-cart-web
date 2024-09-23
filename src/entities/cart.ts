import { Product } from "./product";

export class Cart {
  private _products: Product[] = [];
  private _total: number = 0;

  addToCart(product: Product) {
    // Atualiza o valor total da compra
    this._total += product.price;
    // Adiciona o produto ao carrinho
    this._products.push(product);
  }

  get products() {
    return this._products;
  }

  get total() {
    return this._total;
  }
}
