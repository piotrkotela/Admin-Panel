import "./App.css";
import Header from "./components/Header";
import Users from "./components/Users";
import Products from "./components/Products";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [carts, setCarts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageState, setPageState] = useState("users");
  const [ascOrDsc, setAscOrDsc] = useState(true); 

  const sortByCartValue = () => {
    // true - ascending order sorting, false - descending order
    if (ascOrDsc) {
      setUsers((prevUsers) => {
        const newUsers = [...prevUsers].sort((a, b) => {
          return b.cartvalue - a.cartvalue;
        });
        return newUsers;
      });
      setAscOrDsc(!ascOrDsc);
    } else {
      setUsers((prevUsers) => {
        const newUsers = [...prevUsers].sort((a, b) => {
          return a.cartvalue - b.cartvalue;
        });
        return newUsers;
      });
      setAscOrDsc(!ascOrDsc);
    }
  };

  const changeSectionHandler = (section) => {
    setPageState(section);
  };

  const addCartValueHandler = (users, carts, products) => {
    let newUsers = [];
    users.forEach((user) => {
      const id = user.id;
      let value = 0;
      const inCart = carts.filter((cart) => cart.userId === id);

      if (inCart.length === 0) {
        let pair = { cartvalue: `0.00` };
        user = { ...user, ...pair };
        newUsers.push(user);
      } else {
        for (const cartArray of inCart) {
          for (const productInfo of cartArray.products) {
            const product = products.filter(
              (item) => item.id === productInfo.productId
            );
            value +=
              parseInt(productInfo.quantity) * parseFloat(product[0].price);
          }
        }
        value = value.toFixed(2);
        let pair = { cartvalue: `${value}` };
        user = { ...user, ...pair };
        newUsers.push(user);
      }
    });
    return newUsers;
  };

  const fetchDataHandler = useCallback(async () => {
    setIsLoading(true);
    const usersResponse = await fetch("https://fakestoreapi.com/users");
    const cartsResponse = await fetch("https://fakestoreapi.com/carts");
    const productsResponse = await fetch("https://fakestoreapi.com/products");
    const usersData = await usersResponse.json();
    const cartsData = await cartsResponse.json();
    const productsData = await productsResponse.json();
    const modfiedUsers = addCartValueHandler(
      usersData,
      cartsData,
      productsData
    );
    setUsers(modfiedUsers);
    setCarts(cartsData);
    setProducts(productsData);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  return (
    <>
      <Header changeSection={changeSectionHandler} />
      <div className="wrapper">
        {isLoading && pageState === "users" && <div className="loading"></div>}
        {pageState === "users" && !isLoading && (
          <Users
            users={users}
            carts={carts}
            products={products}
            sortFunc={sortByCartValue}
          />
        )}
        {pageState === "products" && <Products products={products} />}
      </div>
    </>
  );
}

export default App;
