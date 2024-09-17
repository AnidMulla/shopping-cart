import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  async function fetchListOfProducts() {
    const apiResponse = await fetch("https://dummyjson.com/products");
    const result = await apiResponse.json();
    // console.log(result);
    if (result && result.products) {
      setListOfProducts(result.products);
      setLoading(false);
    }
  }
  //   console.log(listOfProducts);
  function handleAddToCart(getProductDetails) {
    let cpyExisitingCartItems = [...cartItems];
    const findIndexOfCurrent = cpyExisitingCartItems.findIndex(
      (cartItem) => cartItem?.id === getProductDetails?.id
    );
    console.log(findIndexOfCurrent);
    if (findIndexOfCurrent === -1) {
      cpyExisitingCartItems.push({
        ...getProductDetails,
        quantity: 1,
        totalPrice: getProductDetails?.price,
      });
    } else {
      cpyExisitingCartItems[findIndexOfCurrent] = {
        ...cpyExisitingCartItems[findIndexOfCurrent],
        quantity: cpyExisitingCartItems[findIndexOfCurrent].quantity + 1,
        totalPrice:
          cpyExisitingCartItems[findIndexOfCurrent].quantity *
          cpyExisitingCartItems[findIndexOfCurrent].price,
      };
    }
    // console.log(cpyExisitingCartItems);
    setCartItems(cpyExisitingCartItems);
    localStorage.setItem("cartItems", JSON.stringify(cpyExisitingCartItems));
    navigate("/cart");
  }
  function handleRemoveFromCart(getProductDetails, isFullyRemovedFromCart) {
    let cpyExisitingCartItems = [...cartItems];
    const findIndexOfCurrentCartItem = cpyExisitingCartItems.findIndex(
      (item) => item.id === getProductDetails.id
    );
    if (isFullyRemovedFromCart) {
      cpyExisitingCartItems.splice(findIndexOfCurrentCartItem, 1);
    } else {
      cpyExisitingCartItems[findIndexOfCurrentCartItem] = {
        ...cpyExisitingCartItems[findIndexOfCurrentCartItem],
        quantity:
          cpyExisitingCartItems[findIndexOfCurrentCartItem].quantity - 1,
        totalPrice:
          (cpyExisitingCartItems[findIndexOfCurrentCartItem].quantity - 1) *
          cpyExisitingCartItems[findIndexOfCurrentCartItem].price,
      };
    }
    localStorage.setItem("cartItems", JSON.stringify(cpyExisitingCartItems));
    setCartItems(cpyExisitingCartItems);
  }
  useEffect(() => {
    fetchListOfProducts();
    setCartItems(JSON.parse(localStorage.getItem("cartItems") || []));
  }, []);
  return (
    <ShoppingCartContext.Provider
      value={{
        listOfProducts,
        loading,
        productDetails,
        setProductDetails,
        setLoading,
        handleAddToCart,
        cartItems,
        handleRemoveFromCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
