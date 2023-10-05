import { BASE_URL } from "../../../helper/helper";
import { useSelector } from "react-redux";

export default function Cart() {
  
  const cart = useSelector((state)=>(state.user.userCart))
  
  
  console.log(cart)
  return (
    <>

      <div className=" pt-28 transition-colors md:pt-24 bg-[#f7f7f7] dark:bg-[#202020] grid grid-cols-1 p-4 sm:px-8 md:grid-cols-2 gap-4 lg:grid-cols-3 justify-items-center gap-y-8 ">
        
        {cart.map(product=>(
          <li>{product.productId.productName}</li>
        ))}
      </div>
    </>
  );
}
