import { useSelector } from "react-redux";
import AccountCard from "./../../../components/cards/accountCard";
import { BASE_URL } from "../../../helper/helper";
import { useRouter } from "next/router";
import {  Spinner } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

export default function Admin(props) {
  const toast = useToast()
  const [admin, setAdmin]= useState(false)
  const userInfo = useSelector((state) => state.user.userInfo);
  const router = useRouter()
  const fetchData = async(token)=>{
    const result = await fetch(BASE_URL + "get-add-product", {
      headers: {
        Authorization: "Bearer " + token,
      },
      method:"POST"
    });
    const res = await result.json();
    
    if (result.status === 201) {
      setAdmin(true)
      
      
    } else {
      toast({
        title: res.message,
        status: "error",
        isClosable: true,
      });
      router.push("/404")
    }
  }
  useEffect(()=>{
    const token = localStorage.getItem("token")
    fetchData(token)
  },[])
  return (
    <>{admin && 
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
      </div>}
      {!admin && 
        <div className="min-h-[500px] pt-28 transition-colors md:pt-20 bg-[#f9f9f9] dark:bg-[#202020]  p-4 sm:px-8 py-0 flex items-center justify-around">
          <Spinner size="lg" color="secondary" />
        </div>
      }
    </>
  );
}


