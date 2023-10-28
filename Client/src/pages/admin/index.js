import Link from "next/link";
import { useSelector } from "react-redux";
import AccountCard from "./../../../components/cards/accountCard";
import { useState, useRef } from "react";
import { useToast } from "@chakra-ui/react";
import Modal from "../../../components/Modal";
import { BASE_URL } from "../../../helper/helper";

export default function Admin(props) {
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <>
      <div className="w-full min-h-[500px] bg-[#fff]  dark:bg-[#171717] dark:text-gray-200 transition-colors pt-32 p-8 md:p-28">
        <div className=" text-center sm:text-left">
          <h1 className="text-3xl ">Hello {userInfo.firstName}! Welcome to Admin Controls.</h1> 
          
        </div>
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row  gap-8 flex-wrap w-full accountContainer">
            <AccountCard
              title="Add a product"
              link="/admin/add-product"
              description="Add a product."
            />
            <AccountCard
              title="User Requests"
              link="/admin/view-requests"
              description="View user requets/complaints ."
            />
            <AccountCard
              title="User Orders"
              link="/admin/view-orders"
              description="View Customer orders."
            />
            <AccountCard
              title="All Products"
              link="/admin/view-products"
              description="Edit/remove products."
            />
           
          </div>
        </div>
      </div>
    </>
  );
}


export async function getServerSideProps({ req }) {
  let message = "";
  const token = req.cookies.jwt;
  const result = await fetch(BASE_URL + "get-add-product", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const res = await result.json();
  if (result.status === 201) {
    message = res.message;
    return {
      props: {
        message: message,
      },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }
}
