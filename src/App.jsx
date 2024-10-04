import { useEffect, useState } from "react";
import "./App.css";
import data from "./Content/data.js";
import Dessert from "./Content/Dessert.jsx";
import Cart from "./Content/Cart.jsx";

function App() {
  const [desserts, setDesserts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setDesserts(data);
    };

    fetchData();
  }, []);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex(
        (item) => item.name === product.name
      );
      if (itemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          quantity: product.quantity,
        };
        return updatedItems;
      } else {
        return [...prevItems, product];
      }
    });
  };

  const removeFromCart = (productName) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.name !== productName)
    );
  };

  return (
    <>
      <div className="container">
        <main className="app--Container">
          <h1>Desserts</h1>
          {desserts.map((dessert, index) => (
            <Dessert
              key={index}
              image={dessert.image}
              category={dessert.category}
              name={dessert.name}
              price={dessert.price}
              addToCart={addToCart}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
          ))}
        </main>
        <aside className="Cart">
          <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
        </aside>
      </div>

      <footer>
        <div class="footer-container">
          <div class="footer-column">
            <h4>Sobre o projeto</h4>
            <p>
              Este footer faz parte de um estudo de design e desenvolvimento que
              realizei para aprimorar minhas habilidades em CSS e
              responsividade.
            </p>
          </div>
          <div class="footer-column">
            <h4>Links profissionais</h4>
            <a href="https://www.linkedin.com/in/rodrigo-vilemen/">
              LinkedIn
            </a>{" "}
            |<a href="https://github.com/r-vilemen">GitHub</a> |
            <a href="mailto:rodrigo.vilemen@hotmail.com">E-mail</a>
          </div>
          <div class="footer-column social-icons">
            <h4>Siga-me</h4>
            <a href="https://www.linkedin.com/in/rodrigo-vilemen/">
              <i class="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://github.com/r-vilemen">
              <i class="fab fa-github"></i>
            </a>
            <a href="mailto:rodrigo.vilemen@hotmail.com">
              <i class="fa fa-envelope"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
