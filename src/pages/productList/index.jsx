import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import ProductTile from "../../components/productTile";

function ProductListPage() {
  const getContextValue = useContext(ShoppingCartContext);
  //   console.log(getContextValue);
  let { listOfProducts, loading } = getContextValue;

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-extralight text-gray-950 sm:text-4xl">
            Our Featured Products
          </h2>
        </div>
        {loading ? (
          <h3>Loading......</h3>
        ) : (
          <div className="grid grid-cols-2 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4">
            {listOfProducts && listOfProducts.length > 0 ? (
              listOfProducts.map((singleProduct) => (
                <ProductTile
                  singleProduct={singleProduct}
                  key={singleProduct.id}
                />
              ))
            ) : (
              <h3>No Products Found</h3>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductListPage;
