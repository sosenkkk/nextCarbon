import Link from "next/link";
import { useSelector } from "react-redux";
import AccountCard from './../../../components/cards/accountCard';

export default function Account() {
  
  const userInfo = useSelector(state=>state.user.userInfo)
  
  return (
    <>
      <div className="w-full bg-[#fff] h-screen dark:bg-[#171717] dark:text-gray-200 pt-32 p-8 md:p-24">
        <div className=" text-center sm:text-left">
          <h1 className="text-3xl ">Hello {userInfo.firstName}!</h1>
          <Link className="md:text-xl hover:underline" href="/account/details">
            Manage your account
          </Link>
        </div>
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row  gap-8 flex-wrap w-full accountContainer">
            <AccountCard title="Your Orders" link='/account/orders' description="Get info about your orders"  />
            <AccountCard title="Security" link='/account/change-password' description="Change your password."  />
            <AccountCard title="Cart" link='/account/cart' description="What's in your cart."  />
            <AccountCard title="Contact Us" link='/account/details' description="Order related or any query."  />
          </div>
        </div>
      </div>
    </>
  );
}
