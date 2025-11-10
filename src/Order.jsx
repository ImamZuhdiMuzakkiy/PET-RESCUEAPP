import { useContext, useEffect, useState } from "react";
import Pizza from "./Pizza";
import Cart from "./Cart";
import { CartContext } from "./contexts";

const kurs = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Order() {
  const [cart, setCart] = useContext(CartContext);
  // state untuk piza yang dipilih (form)
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [cart, setCart] = useState([]);

  let price, selectedPizza;
  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    // console.log(selectedPizza)
    price = kurs.format(
      selectedPizza.sizes ? selectedPizza.sizes[pizzaSize] : "",
    );
  }

  // hanya akan dijalankan saat page selesai di-render (1x)
  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  async function fetchPizzaTypes() {
    // for testing purposes only. untuk delay selama 3 detik (menciptakan env real)
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // calling API
    const response = await fetch("/api/pizzas");
    // console.log(response)
    // parsing responenya ke JSON
    const json = await response.json();
    // hasil parsingdi assign ke state
    setPizzaTypes(json);
    setLoading(false);
  }

  async function checkout() {
    setLoading(true);

    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart,
      }),
    });
  }

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCart([
            ...cart,
            { pizza: selectedPizza, size: pizzaSize, price: price },
          ]);
        }}
        action=""
      >
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              onChange={(e) => setPizzaType(e.target.value)}
              onBlur={(e) => setPizzaType(e.target.value)}
              name="pizza-type"
              value={pizzaType}
              id=""
            >
              {pizzaTypes.map((pizza) => (
                <option value={pizza.id} key={pizza.id}>
                  {pizza.name}
                </option>
              ))}
            </select>
          </div>
          <label htmlFor="pizza-size">Pizza Size</label>
          <div>
            <span>
              <input
                onChange={(e) => setPizzaSize(e.target.value)}
                type="radio"
                name="pizza-size"
                id="pizza-s"
                checked={pizzaSize === "S"}
                value="S"
              />
              <label htmlFor="pizza-s">Small</label>
            </span>
            <span>
              <input
                onChange={(e) => setPizzaSize(e.target.value)}
                type="radio"
                name="pizza-size"
                id="pizza-m"
                checked={pizzaSize === "M"}
                value="M"
              />
              <label htmlFor="pizza-m">Medium</label>
            </span>
            <span>
              <input
                onChange={(e) => setPizzaSize(e.target.value)}
                type="radio"
                name="pizza-size"
                id="pizza-l"
                checked={pizzaSize === "L"}
                value="L"
              />
              <label htmlFor="pizza-l">Large</label>
            </span>
          </div>
          <button type="submit">Tambahkan ke Keranjang</button>
        </div>
        <div>
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <div className="order-pizza">
              <Pizza
                name={selectedPizza.name}
                description={selectedPizza.description}
                image={selectedPizza.image}
              />
              <p>{price}</p>
            </div>
          )}
        </div>
      </form>
      {loading ? <h2>Loading...</h2> : <Cart checkout={checkout} cart={cart} />}
    </div>
  );
}
