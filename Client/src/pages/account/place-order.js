import { BASE_URL } from "../../../helper/helper";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { fetchUserCart } from "@/store/userInfoSlice";
import Modal from "../../../components/Modal";

import Link from "next/link";
export default function PlaceOrder() {
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
    router.push("/");
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
      <div className=" min-h-screen pt-28 transition-colors md:pt-24 bg-[#f7f7f7] dark:bg-[#171717] p-4 sm:px-8  ">
        {cart.length != 0 && <>
        
        
        </>}
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
