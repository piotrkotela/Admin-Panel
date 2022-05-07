import "./Products.css";
import { Fragment, useState, useEffect, useCallback } from "react";
import ProductCard from "./UI/ProductCard";

const Products = (props) => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCategory] = useState("all");
  const [currentCategoryValue, setCurrentCategoryValue] = useState();

  const setCategoriesHandler = useCallback(() => {
    const uniqueCategories = [
      ...new Set(props.products.map((product) => product.category)),
    ];
    setCategories(uniqueCategories);
  }, [props.products]);

  const setCurrentCategoryValueHandler = useCallback(() => {
    let value = 0;
    if (currentCategory === "all") {
      for (const product of props.products) {
        value += parseFloat(product.price);
      }
      value = Math.round(value * 100) / 100;
      setCurrentCategoryValue(value);
    } else {
      for (const product of props.products) {
        if (product.category === currentCategory) {
          value += parseFloat(product.price);
        }
        value = Math.round(value * 100) / 100;
        setCurrentCategoryValue(value);
      }
    }
  }, [currentCategory, props.products]);

  useEffect(() => {
    setCategoriesHandler();
  }, [setCategoriesHandler]);

  useEffect(() => {
    setCurrentCategoryValueHandler();
  }, [setCurrentCategoryValueHandler]);

  const setCategoryHandler = (event) => {
    setCategory(event.target.value);
  };

  return (
    <>
      <div className="options" >
        <p>Filters:</p>
        <div className="option">
          <input
            type="radio"
            name="category"
            id="all"
            value="all"
            checked={currentCategory === "all"}
            onChange={setCategoryHandler}
          />
          <label htmlFor="all">all</label>
        </div>

        {categories.map((category) => (
          <div className="option" key={category}>
            <input
              type="radio"
              name="category"
              id={`${category}`}
              value={`${category}`}
              checked={currentCategory === category}
              onChange={setCategoryHandler}
            />
            <label htmlFor={`${category}`}>{`${category}`}</label>
          </div>
        ))}
      </div>
      <p>Total Value: $ {currentCategoryValue}</p>
      <div className="productsSection">
        {props.products
          .filter((product) => {
            if (product.category === currentCategory) {
              return true;
            } else if (currentCategory === "all") {
              return true;
            }
            return false;
          })
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Products;
