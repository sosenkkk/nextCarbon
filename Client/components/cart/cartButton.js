import Link from "next/link";
import { useEffect, useState } from "react";
import { BsHandbagFill } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function CartButton() {
  const cart = useSelector((state) => state.user.userCart);
  const [buttonBump, setButtonBump]=useState(false);
  useEffect(() => {
    setButtonBump(true);
    
    const timer = setTimeout(() => {
      setButtonBump(false);
    }, 250);
    return ()=>{
      clearTimeout(timer);
    }
  }, [cart]);
  const buttonClasses=` ${buttonBump ? 'text opacity-100 bump' : 'text opacity-100'}`
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
          <span id="cartButtonBump" className={buttonClasses}>
            {cart.length}
          </span>
        </Link>
      </div>
    </>
  );
}
