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
    this.toHTML(); // Atualiza a interface após remover o item
  }

  static addToCart(product: Product) {
    // Verificar se o produto existe no carrinho
    const productExists = this._products.includes(product);

    // Se o produto não estiver no carrinho, adicione
    if (!productExists) {
      this._products.push(product);
    }

    // Atualiza o valor total da compra
    this.calculateTotal();

    // Atualiza o carrinho de compras no HTML
    this.toHTML();
  }

  static incrementQuantity(product: Product) {
    product.incrementQuantity();
    this.calculateTotal();
    this.toHTML(); // Atualiza a interface
  }

  static decrementQuantity(product: Product) {
    if (product.quantity > 1) {
      product.decrementQuantity();
    } else {
      this.removeProduct(product); // Remove o produto se a quantidade for 0
    }

    this.calculateTotal();
    this.toHTML(); // Atualiza a interface
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
          <span>Total: $${product.total.toFixed(2)}</span>
          <div>
            <button class="decrement" data-id="${product.id}">-</button>
            <button class="increment" data-id="${product.id}">+</button>
            <button class="remove" data-id="${product.id}">Remove</button>
          </div>
        </div>
      `;

      cartListHTML.appendChild(liHTML);
    }

    // Adiciona event listeners aos botões de incrementar, decrementar e remover
    cartListHTML.querySelectorAll(".increment").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = (event.target as HTMLElement).getAttribute("data-id");
        const product = this._products.find((p) => p.id === productId);
        if (product) {
          this.incrementQuantity(product);
        }
      });
    });

    cartListHTML.querySelectorAll(".decrement").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = (event.target as HTMLElement).getAttribute("data-id");
        const product = this._products.find((p) => p.id === productId);
        if (product) {
          this.decrementQuantity(product);
        }
      });
    });

    cartListHTML.querySelectorAll(".remove").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = (event.target as HTMLElement).getAttribute("data-id");
        const product = this._products.find((p) => p.id === productId);
        if (product) {
          this.removeProduct(product);
        }
      });
    });
  }

  static get products() {
    return this._products;
  }

  static get total() {
    return this._orderTotal;
  }
}
