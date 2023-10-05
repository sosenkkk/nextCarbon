import { BASE_URL } from "../../../helper/helper";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { fetchUserCart } from "@/store/userInfoSlice";
import Modal from "../../../components/Modal";

import Link from "next/link";
export default function Cart() {
  const cart = useSelector((state) => state.user.userCart);
  const token = useSelector((state) => state.auth.userToken);
  const toast = useToast();
  const dispatch = useDispatch();
  const [total, setTotal] = useState({});
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const totalAmount = async () => {
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
  const deleteFromCartHandler = async (event) => {
    const id = event.target.id.toString();
    console.log(id);

    if (id === "clearBtn") {
      const result = await fetch(BASE_URL + "delete-cart", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      if (result.status == 201) {
        dispatch(fetchUserCart(token));
      } else if (result.status == 433) {
        toast({
          title: res.message,
          status: "error",
          isClosable: true,
        });
      }
    } else {
      const result = await fetch(BASE_URL + "delete/" + id, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      if (result.status == 201) {
        dispatch(fetchUserCart(token));
      } else if (result.status == 433) {
        toast({
          title: res.message,
          status: "error",
          isClosable: true,
        });
      }
    }
  };
  return (
    <>
      <div className=" min-h-screen pt-28 transition-colors md:pt-24 bg-[#f7f7f7] dark:bg-[#202020] p-4 sm:px-8  ">
        {cart.length != 0 && (
          <>
            <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-lg font-semibold text-left text-gray-800 bg-white dark:text-gray-200 dark:bg-[#171717]">
                  Your Cart
                  <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                    Products added in your cart.
                  </p>
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#111111] dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Model
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product) => (
                    <tr
                      key={product.productId._id}
                      className="bg-white border-b dark:bg-[#171717] dark:border-[#111]"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {product.productId.productName}
                      </th>
                      <td className="px-6 py-4 dark:text-white">
                        {product.productId.productModel}
                      </td>

                      <td className="px-6 py-4 dark:text-white">{product.quantity}</td>
                      <td className="px-6 py-4 dark:text-white">
                        ₹{product.productId.productPrice}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={deleteFromCartHandler}
                          id={product._id}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="  bg-gray-50 dark:bg-[#111111] ">
                  <tr className="font-semibold text-gray-800 dark:text-gray-200">
                    <th scope="row" className="px-6 py-3 text-base">
                      Total
                    </th>
                    <td className="px-6 py-3"></td>
                    <td className="px-6 py-3">{total.quantity}</td>
                    <td className="px-6 py-3">₹{total.price}</td>
                    <td className="px-6 py-3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="flex flex-col items-end">
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
                    <button
                      className="cartBtn"
                      onClick={goToPlaceOrder}
                    >
                      Yes
                    </button>
                    <button
                      style={{backgroundColor:"#F24C3D"}}
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
                style={{backgroundColor:"#F24C3D"}}
              >
                Clear Cart!
              </button>
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
    </>
  );
}
