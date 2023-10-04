import ProductCard from "../../../components/products/productCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../helper/helper";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserCart } from "@/store/userInfoSlice";

export default function Products() {
  const [productPage, setproductPage] = useState(1);
  const dispatch = useDispatch();
  const [products, setproducts] = useState([]);
  const token = useSelector((state)=>(state.auth.userToken))
  const fetchProducts = async () => {
    const result = await fetch(BASE_URL + "products");
    const res = await result.json();
    setproducts(res.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const cartChangeHandler=async(id)=>{
    const productId = id;
    const result = await fetch(BASE_URL + "cart", {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization : "Bearer "+ token
        },
      body:JSON.stringify({
        productId: productId
      })
    })
    const res = await result.json()
    if(result.status == 201){
      dispatch(fetchUserCart(token))
    }else if(result.status == 433) {
      console.log("noo")
    }
  }
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
            id={product._id.toString()}
            onAddCart = {cartChangeHandler}
          />
        ))}
      </div>
    </>
  );
}
