import { fetchUserCart } from "@/store/userInfoSlice";
import Link from "next/link";
import { useEffect } from "react";
import { BsFillCartFill, BsSunFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

export default function CartButton() {
  const cart = useSelector((state) => state.user.userCart);
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();
  useEffect(() => {
    const cartBtn = document.getElementById("cartButtonBump");
    console.log(cartBtn);
    cartBtn.classList.add("bump");
    setTimeout(() => {
      cartBtn.classList.remove("bump");
    }, 250);
  }, [cart]);

  return (
    <>
      <div>
        <button
          className=" text-gray-900 dark:text-white buttonTog"
          style={{ padding: "6px " }}
          id="cartButton"
        >
          <BsFillCartFill fontSize={16} />
          <span id="cartButtonBump" className="text opacity-100" >
            {cart.length}
          </span>
        </button>
      </div>
    </>
  );
}
