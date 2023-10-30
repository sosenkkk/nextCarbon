import { useEffect, useState } from "react";
import { BASE_URL } from "../../../helper/helper";
import { useSelector, useDispatch } from "react-redux";
import { cart, total } from "@/store/userInfoSlice";
import { useRouter } from "next/router";

export default function SingleProduct() {
  const isAuth = useSelector((state)=>state.auth.isAuthenticated)
  const router = useRouter()
  const [product, setProduct]=useState();
  const dispatch = useDispatch();
  const [quantity, setquantity] = useState(1);
  const token = useSelector((state) => state.auth.userToken);
  const fetchData =async(productId )=>{
    const result = await fetch(BASE_URL + "products/"+productId);
    const res = await result.json();
    if (result.status === 201) {
      setProduct(res.product);
      
    } else {
      
    }
  }
  useEffect(()=>{
    if(router.isReady){
      const productId = router.query.product;
      fetchData(productId)
    }
    
  }, [router.isReady])
  const cartChangeHandler = async (id) => {
    const productId = product._id;
    const result = await fetch(BASE_URL + "cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        productId: productId,
        quantity:quantity
      }),
    });
    const res = await result.json();
    if (result.status == 201) {
      dispatch(cart(res.cart));
      dispatch(total(res.total));
    } else if (result.status == 433) {
      console.log("noo");
    }
  };
  function numberWithCommas(x) {
    return x.toLocaleString("en-IN");
  }
  const changeQuantityHandler = (event) => {
    const id = event.target.id;
    if(id === "increase"){
        setquantity((prev)=>prev+1)
    }else if(id === "decrease"){
        if(quantity>1){
            setquantity((prev)=>prev-1)
        }else{
            setquantity(1)
        }
    }else{
        const value = Number(event.target.value)
        setquantity(value)
    }
  };
  
  return (
    <>
     {product && <section className="overflow-hidden bg-[#f7f7f7]  pt-24 font-poppins dark:bg-[#202020]">
        <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full mb-8 px-4 md:w-1/2 md:mb-0">
              <div>
                <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
                  <img
                    src={product.productImage}
                    alt=""
                    className="object-cover w-full lg:h-full singleProductImage"
                  />
                </div>

                
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2 ">
              <div className="lg:pl-20" />
              <div className="mb-8 ">
                <h2 className="max-w-xl mb-6 text-2xl font-bold dark:text-gray-200 md:text-4xl">
                    {product.productName}
                </h2>
                <p className="inline-block mb-6 text-4xl font-bold text-gray-700 dark:text-gray-200 ">
                  <span>₹ {numberWithCommas(product.productPrice)}</span>
                  {/* <span className="text-base font-normal text-gray-500 line-through dark:text-gray-200">
                    $1800.99
                  </span> */}
                </p>
                <p className="max-w-md text-gray-700 dark:text-gray-300">
                  Category - {product.productModel}<br/>
                  Model - {product.productModelNumber}
                </p>
              </div>

              {isAuth && <div><div className="w-32 mb-8 ">
                <label
                  htmlFor=""
                  className="w-full pb-1 text-xl font-semibold text-gray-700 border-b border-blue-300 dark:border-gray-600 dark:text-gray-200"
                >
                  Quantity
                </label>
                <div className="relative flex flex-row w-full h-10 mt-6 bg-transparent rounded-lg">
                  <button onClick={changeQuantityHandler} id="decrease" className="w-20 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer dark:hover:bg-[#111] dark:text-gray-200 hover:text-gray-700 dark:bg-[#171717] hover:bg-gray-400 border-r-2 dark:border-[#202020]">
                    <span className="m-auto text-2xl font-thin"  id="decrease">-</span>
                  </button>
                  <input
                    type="text"
                    className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 outline-none dark:text-gray-200 dark:placeholder-gray-400 dark:bg-[#171717]  text-md hover:text-black border-none"
                    value={quantity}
                    id="custom"
                    onChange={changeQuantityHandler}
                  />
                  <button onClick={changeQuantityHandler} id="increase"  className="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-[#111] dark:text-gray-200 dark:bg-[#171717] hover:text-gray-700 hover:bg-gray-400 border-l-2 dark:border-[#202020]">
                    <span className="m-auto text-2xl font-thin" id="increase">+</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <button onClick={cartChangeHandler} className="w-full p-4 bg-teal-500 rounded-md lg:w-2/5 dark:text-gray-200 text-gray-50 hover:bg-teal-600 dark:bg-teal-500 dark:hover:bg-teal-700 crtBtn">
                  Add to cart
                </button>
              </div></div>}
              <div className="px-6 pb-6 mt-6 border-t border-gray-300 dark:border-gray-400 ">
                  <div className="flex flex-wrap items-center mt-6">
                    <span className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-4 h-4 text-gray-700 dark:text-gray-200 bi bi-truck"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                      </svg>
                    </span>
                    <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200">
                      Free Shipping
                    </h2>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>}
    </>
  );
}


  