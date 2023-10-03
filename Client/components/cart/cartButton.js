import { fetchUserCart } from "@/store/userInfoSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CartButton(){
    const cart = useSelector((state)=>state.user.userCart);
    const token = useSelector((state)=>state.auth.userToken)
    const dispatch = useDispatch()
    
    console.log(cart.length)

    
    return(
        <>
        <Link href="/" className="text-xl text-black dark:text-white">
            {cart.length}
        </Link>
        </>
    )
}