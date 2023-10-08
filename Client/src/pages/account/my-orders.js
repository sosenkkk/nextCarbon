import { BASE_URL } from "../../../helper/helper";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { fetchUserCart } from "@/store/userInfoSlice";
import Modal from "../../../components/Modal";

import Link from "next/link";
export default function MyCart(props) {
  
  const total = useSelector((state) => state.user.total);
  const token = useSelector((state) => state.auth.userToken);
  const toast = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(props.orders)
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const goToPlaceOrder = () => {
    router.push("/account/place-order");
  };
  const viewOrderHandler = async (event) => {
    const id = event.target.id.toString();
    console.log(id)

      const result = await fetch(BASE_URL + "my-order/"+id, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      if (result.status == 201) {
        
        
      } else if (result.status == 433) {
        toast({
          title: res.message,
          status: "error",
          isClosable: true,
        });
      }
    // } else {
    //   const result = await fetch(BASE_URL + "delete/" + id, {
    //     headers: {
    //       Authorization: "Bearer " + token,
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   if (result.status == 201) {
    //     dispatch(fetchUserCart(token));
    //   } else if (result.status == 433) {
    //     toast({
    //       title: res.message,
    //       status: "error",
    //       isClosable: true,
    //     });
    //   }
    // }
  };
  return (
    <>
      <div className=" min-h-screen pt-28 transition-colors md:pt-24 bg-[#f7f7f7] dark:bg-[#202020] p-4 sm:px-8  ">
        {props.orders.length != 0 && (
          <>
            <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-lg font-semibold text-left text-gray-800 bg-white dark:text-gray-200 dark:bg-[#171717]">
                  Your Orders
                  <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                    Orders you've placed before.
                  </p>
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#111111] dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Order Placed
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ship to
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props.orders.map((product) => (
                    <tr
                      key={product.id}
                      className="bg-white border-b dark:bg-[#171717] dark:border-[#111]"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {product.user.name}
                      </th>
                      <td className="px-6 py-4 dark:text-white">
                        {product.orderPlaced}
                      </td>

                      <td className="px-6 py-4 dark:text-white">
                        {product.total.totalQuantity}
                      </td>
                      <td className="px-6 py-4 dark:text-white">
                        ₹{product.total.totalPrice}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={viewOrderHandler}
                          id={product.id}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* <tfoot className="  bg-gray-50 dark:bg-[#111111] ">
                  <tr className="font-semibold text-gray-800 dark:text-gray-200">
                    <th scope="row" className="px-6 py-3 text-base">
                      Total
                    </th>
                    <td className="px-6 py-3"></td>
                    <td className="px-6 py-3">{total.totalQuantity}</td>
                    <td className="px-6 py-3">₹{total.totalPrice}</td>
                    <td className="px-6 py-3"></td>
                  </tr>
                </tfoot> */}
              </table>
            </div>
            {/* <div className="flex flex-col items-end">
              <button
                className="cartBtn text-white"
                id="orderBtn"
                onClick={openModal}
              >
                Order!
              </button>
              <Modal isOpen={isModalOpen} onClose={closeModal} maxWidth="500px">
                <div className="px-8 rounded-lg py-4 bg-[#f7f7f7]  dark:bg-[#171717] text-gray-800 dark:text-gray-200">
                  <h2 className="text-lg text-center sm:text-xl font-semibold mb-4">
                    Click "Yes" to proceed with your order!
                  </h2>
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:justify-around">
                    <button className="cartBtn" onClick={goToPlaceOrder}>
                      Yes
                    </button>
                    <button
                      style={{ backgroundColor: "#F24C3D" }}
                      className="cartBtn"
                      onClick={closeModal}
                    >
                      No
                    </button>
                  </div>
                </div>
              </Modal>

              <button
                className="cartBtn text-white"
                id="orderBtn"
                onClick={deleteFromCartHandler}
                style={{ backgroundColor: "#F24C3D" }}
              >
                Clear Cart!
              </button>
            </div> */}
          </>
        )}
        {props.orders.length === 0 && (
          <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <caption className="p-5 text-lg font-semibold text-left text-gray-800 bg-white dark:text-gray-200 dark:bg-[#171717]">
                Your have placed no orders.
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Continue shopping. Add {" "}
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
    </>
  );
}

export const getServerSideProps=async(context)=>{
  const {req} = context;
  const token = req.cookies.jwt;
  const result = await fetch(BASE_URL+"my-orders",{
    headers:{
      "Content-Type":"application/json",
      Authorization:"Bearer "+token
    },
    credentials:"include"
  })
  const res = await result.json();
  let orders, message;
  if(result.status==201){
     orders = res.orders;
    message= res.message;
    
  }else if(result.status == 404){
    orders = [];
    message= res.message;
  }else{
    orders = [];
    message= res.message;
  }
  return {
    props:{
      orders:orders,
      message : message
    }
  }
}
