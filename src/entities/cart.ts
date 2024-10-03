import { Product } from "./product";

export class Cart {
  private static _products: Product[] = [];
  private static _orderTotal: number = 0;
  private static _quantityTotal: number = 0;

  static calculateTotal() {
    this._orderTotal = 0;
    this._quantityTotal = 0;

    this._products.forEach((product) => {
      this._orderTotal += product.total;
      this._quantityTotal += product.quantity;
    });
  }

  static removeProduct(product: Product) {
    // Remove um produto do carrinho
    this._products = this._products.filter((item) => item.id !== product.id);
    this.calculateTotal();
  }

  static addToCart(product: Product) {
    // Verificar se o produto existe no carrinho
    const productExists = this._products.includes(product);

    // Se o produto não estiver no carrinho, execute
    if (!productExists) {
      this._products.push(product);
    }

    // Atualiza o valor total da compra
    this.calculateTotal();

    // Atualiza o carrinho de compras no HTML
    this.toHTML();
    // console.log(JSON.parse(JSON.stringify(Cart._products)));
  }

  static toHTML() {
    const cartHTML = document.getElementById("cart");

    if (!cartHTML) return;

    const quantityTotalHTML = cartHTML.firstElementChild?.firstElementChild;

    if (!quantityTotalHTML) return;

    quantityTotalHTML.innerHTML = this._quantityTotal.toString();

    const cartListHTML = cartHTML.querySelector("ul");

    if (!cartListHTML) return;
    cartListHTML.innerHTML = "";

    for (const product of this._products) {
      const liHTML = document.createElement("li");
      liHTML.innerHTML = `
        <span>${product.name}</span>
        <div>
          <span>${product.quantity}x</span>
          <span>@$${product.price}</span>
          <span>$${product.total}</span>
        </div>
      `;

      cartListHTML.appendChild(liHTML);
    }
  }

  static get products() {
    return this._products;
  }

  static get total() {
    return this._orderTotal;
  }
}
