import { BASE_URL } from "../../../helper/helper";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { fetchUserCart } from "@/store/userInfoSlice";

import Link from "next/link";
import Footer from "../../../components/footer/footer";
export default function PlaceOrder() {
  const cart = useSelector((state) => state.user.userCart);
  const token = useSelector((state) => state.auth.userToken);
  const toast = useToast();
  const dispatch = useDispatch();
  const [total, setTotal] = useState({});
  const router = useRouter();
  useEffect(() => {
    const totalAmount = async () => {
      const token = localStorage.getItem("token")
      const result = await fetch(BASE_URL + "total", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const res = await result.json();
      if (result.status == 201) {
        setTotal({ price: res.totalPrice, quantity: res.totalQuantity });
      } else {
        router.push("/account");
        toast({
          title: res.message,
          status: "error",
          isClosable: true,
        });
      }
    };
    totalAmount();
  }, [cart]);
  
  const checkOutHandler = async (event) => {
    

    
      const result = await fetch(BASE_URL + "check-out", {
        method:"POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body:JSON.stringify({

        })
      });
      // if (result.status == 201) {
      //   dispatch(fetchUserCart(token));
      // } else if (result.status == 433) {
      //   toast({
      //     title: res.message,
      //     status: "error",
      //     isClosable: true,
      //   });
      // }
    
  };
  return (
    <>
      <div className=" pt-28 transition-colors md:pt-24 bg-[#f7f7f7] dark:bg-[#171717] p-4 sm:px-6  ">
        {cart.length != 0 && (
          <>
            <div className="  grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
            <div className="  md:justify-self-start justify-self-start w-full col-span-1 p-4 pt-6 pb-8 flex shadow-md flex-col md:max-w-xs gap-y-2 text-gray-800 h-fit dark:text-gray-200 bg-white dark:bg-[#252525] rounded-lg" >
                <h1 className="text-2xl font-semibold text-center border-b-2 border-teal-500 dark:border-teal-700  ">Order Summary</h1>
                <div className="flex justify-between"> <p>Total Items :</p> <p>{total.quantity}</p> </div>
               
                <div className="flex justify-between"> <p>Total Price  : </p><p>₹{total.price}</p> </div>
              </div>
              <form className="col-span-2 mb-8">
              <h1 className="text-2xl sm:text-3xl text-gray-800 dark:text-gray-200 mb-4"> Enter delivery address! </h1>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="floating_email"
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-teal-500 appearance-none dark:text-white dark:border-teal-500 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    
                  />
                  <label
                    for="floating_email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                  >
                    Full Name
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="floating_password"
                    id="floating_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-teal-500 appearance-none dark:text-white dark:border-teal-500 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    
                  />
                  <label
                    for="floating_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                  >
                    Shipping Address
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="repeat_password"
                    id="floating_repeat_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-teal-500 appearance-none dark:text-white dark:border-teal-500 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    
                  />
                  <label
                    for="floating_repeat_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                  >
                    LandMark(optional)
                  </label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="floating_first_name"
                      id="floating_first_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-teal-500 appearance-none dark:text-white dark:border-teal-500 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      
                    />
                    <label
                      for="floating_first_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                    >
                      State
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="floating_last_name"
                      id="floating_last_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-teal-500 appearance-none dark:text-white dark:border-teal-500 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      
                    />
                    <label
                      for="floating_last_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                    >
                      City
                    </label>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="number"
                      name="floating_company"
                      id="floating_company"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-teal-500 appearance-none dark:text-white dark:border-teal-500 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      
                    />
                    <label
                      for="floating_company"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                    >
                      Pincode
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="number"
                      name="floating_phone"
                      id="floating_phone"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-teal-500 appearance-none dark:text-white dark:border-teal-500 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      
                    />
                    <label
                      for="floating_phone"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                    >
                      Phone number 
                    </label>
                  </div>
                  
                </div>
                <button
                  type="submit"
                  className="cartBtn"
                
                >
                  Submit
                </button>
              </form>
              {/* <div className=" md:block hidden md:justify-self-end justify-self-start w-full col-span-1 p-4 pt-6 pb-8 flex shadow-md flex-col md:max-w-xs gap-y-2 text-gray-800 h-fit dark:text-gray-200 bg-white rounded-lg" >
                <h1 className="text-2xl font-semibold text-center border-b-2 border-teal-500 dark:border-teal-700  ">Order Summary</h1>
                <div className="flex justify-between"> <p>Total Items :</p> <p>{total.quantity}</p> </div>
               
                <div className="flex justify-between"> <p>Total Price  : </p><p>₹{total.price}</p> </div>
              </div> */}
            </div>
          </>
        )}
        {cart.length === 0 && (
          <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <caption className="p-5 text-lg font-semibold text-left text-gray-800 bg-white dark:text-gray-200 dark:bg-[#171717]">
                Your Cart is Empty
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Add{" "}
                  <Link
                    href="/products"
                    className="underline cursor-pointer text-teal-700 dark:text-teal-500"
                  >
                    Products
                  </Link>{" "}
                  in your cart.
                </p>
              </caption>
            </table>
          </div>
        )}
        
      </div>
      <Footer/>
      
    </>
  );
}