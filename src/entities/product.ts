import { v4 as uuidv4 } from "uuid";
import { Cart } from "./cart";

export class Product {
  private _id: string = uuidv4();
  private _name: string;
  private _price: number;
  private _category: string;
  private _imageUrl: string;
  private _quantity: number = 0;
  private _total: number = 0;

  constructor(name: string, price: number, category: string, imageUrl: string) {
    this._name = name;
    this._price = price;
    this._category = category;
    this._imageUrl = imageUrl;
  }

  toHTML() {
    const productListHTML = document.getElementById("product-list");

    if (!productListHTML) return;

    const productHTML = document.createElement("li");
    productHTML.id = this._id;

    productHTML.innerHTML = `
        <div class="flex flex-col h-[260px] w-[250px] border border-black">
          <div class="mb-6 relative h-full bg-red-400 border border-red-600">
            <img src="${this._imageUrl}" alt="${
      this._name
    }" class="h-full w-full object-cover">
            <div id="button-add-to-cart-${
              this._id
            }" class="button center text-xs">Add to Cart</div>
          </div>

          <div class="flex flex-col">
            <span class="product-category">${this._category}</span>
            <span class="product-name">${this._name}</span>
            <span class="product-price">$${this.price.toFixed(2)}</span>
          </div>

          <div class="flex justify-between mt-4">
            <button id="decrement-${
              this._id
            }" class="bg-gray-300 px-2 py-1">-</button>
            <span id="quantity-${this._id}" class="text-sm">${
      this._quantity
    }</span>
            <button id="increment-${
              this._id
            }" class="bg-gray-300 px-2 py-1">+</button>
          </div>
        </div>
      `;

    // Adicionar ao carrinho
    productHTML
      .querySelector(`#button-add-to-cart-${this._id}`)
      ?.addEventListener("click", () => this.incrementQuantity());

    // Incrementar a quantidade
    productHTML
      .querySelector(`#increment-${this._id}`)
      ?.addEventListener("click", () => this.incrementQuantity());

    // Diminuir a quantidade
    productHTML
      .querySelector(`#decrement-${this._id}`)
      ?.addEventListener("click", () => this.decrementQuantity());

    productListHTML.appendChild(productHTML);
  }

  get id() {
    return this._id;
  }

  updateTotal() {
    this._total = this._price * this._quantity;
  }

  incrementQuantity() {
    this._quantity += 1;
    this.updateTotal();
    Cart.addToCart(this);

    // Atualizar a quantidade exibida no HTML
    document.getElementById(`quantity-${this._id}`)!.textContent = String(
      this._quantity
    );
  }

  decrementQuantity() {
    if (this._quantity > 0) {
      this._quantity -= 1;
      this.updateTotal();

      // Se a quantidade for 0, remover do carrinho
      if (this._quantity === 0) {
        Cart.removeFromCart(this);
      } else {
        Cart.toHTML(); // Atualizar o carrinho
      }

      // Atualizar a quantidade exibida no HTML
      document.getElementById(`quantity-${this._id}`)!.textContent = String(
        this._quantity
      );
    }
  }

  get total() {
    return this._total;
  }

  get quantity() {
    return this._quantity;
  }

  set quantity(quantity: number) {
    this._quantity = quantity;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }
}
