import ProductCard from "../../../components/products/productCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../helper/helper";

export default function Products() {
  const [productPage, setproductPage] = useState(1);
  const [products, setproducts] = useState([]);
  console.log(products);
  const fetchProducts = async () => {
    const result = await fetch(BASE_URL + "products");
    const res = await result.json();
    setproducts(res.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <div className=" pt-28 transition-colors md:pt-24 bg-[#f7f7f7] dark:bg-[#202020] grid grid-cols-1 p-4 sm:px-8 md:grid-cols-2 gap-4 lg:grid-cols-3 justify-items-center gap-y-8 ">
        {products.map((product) => (
          <ProductCard
            image={product.productImage}
            name={product.productName}
            model={product.productModel}
            price={product.productPrice}
            modelNo={product.productModelNumber}
            key={product._id.toString()}
          />
        ))}
      </div>
    </>
  );
}
