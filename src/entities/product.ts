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
          <div class="mb-6 relative h-full border border-red-600">
            <div id="button-add-to-cart" class="button center text-xs">Add to Cart</div>
          </div>

          <div class="flex flex-col">
            <span class="product-category">${this._category}</span>
            <span class="product-name">${this._name}</span>
            <span class="product-price">${this.price}</span>
          </div>
        </div>
      `;

    productHTML
      .querySelector("#button-add-to-cart")
      ?.addEventListener("click", () => this.incrementQuantity());

    productListHTML.appendChild(productHTML);
  }

  get id() {
    return this._id;
  }

  updateTotal() {
    this._total = this._price * this._quantity;
  }

  incrementQuantity() {
    console.log("entrou aqui");
    this._quantity += 1;
    this.updateTotal();

    Cart.addToCart(this);
  }

  decrementQuantity() {
    this._quantity -= 1;
    this.updateTotal();
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
