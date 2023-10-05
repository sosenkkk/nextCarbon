import Link from "next/link";
import { useEffect } from "react";
import { BsHandbagFill } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function CartButton() {
  const cart = useSelector((state) => state.user.userCart);

  useEffect(() => {
    const cartBtn = document.getElementById("cartButtonBump");
    cartBtn.classList.add("bump");
    setTimeout(() => {
      cartBtn.classList.remove("bump");
    }, 250);
  }, [cart]);

  return (
    <>
      <div>
        <Link
          href="/account/my-cart"
          className=" text-gray-900 dark:text-white flex  "
          style={{ padding: "6px " }}
          id="cartButton"
        >
          <BsHandbagFill className="buttonTog" fontSize={16} />
          <span id="cartButtonBump" className="text opacity-100">
            {cart.length}
          </span>
        </Link>
      </div>
    </>
  );
}
