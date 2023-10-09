import { useRouter } from "next/router";
import { BASE_URL } from "../../../helper/helper";
import { useState, useEffect } from "react";
export default function Order(props) {
  const order = props.order;
  const user = order.user;
  const total = order.total;
  const orderDateParse = new Date(order.createdAt);
  let orderDate = orderDateParse.toLocaleDateString();
  let orderTime = orderDateParse.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  let dateAndTime;
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    dateAndTime = " ";
    return null;
  } else {
    dateAndTime = `${orderDate} at ${orderTime}`;
  }
  order.products.map((product)=>{
    console.log(product)
  })
  return (
    <>
      <div className="pt-24 min-h-screen md:pt-20 bg-[#f7f7f7] dark:bg-[#131313]">
        <div className="bg-white dark:bg-[#131313] rounded-lg w-full">
          <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col">
              <h1 className="text-3xl dark:text-gray-200 lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-700">
                Order Id: #{order._id}
              </h1>
              <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
                {dateAndTime}
              </p>
            </div>
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
              <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                <div className="flex flex-col justify-start items-start dark:bg-[#171717]  rounded-lg shadow-xl bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  <p className="text-lg md:text-xl dark:text-gray-200 font-semibold leading-6 xl:leading-5 text-gray-800">
                    Customer's Cart
                  </p>
                  {order.products.map((product)=>{
                    return (
                      
 <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                    <div className="pb-4 md:pb-8 w-full md:w-40">
                      <img
                        className="w-full hidden md:block"
                        src={product.product.productImage}
                        alt="dress"
                      />
                      <img
                        className="w-full md:hidden"
                        src={product.product.productImage}
                        alt="dress"
                      />
                    </div>
                    <div className="border-b border-teal-500 dark:border-teal-700 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl dark:text-gray-200 xl:text-2xl font-semibold leading-6 text-gray-800">
                          {product.product.productName}
                        </h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm dark:text-gray-200 leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-400">
                              Model:{" "}
                            </span>{" "}
                            {product.product.productModel}
                          </p>
                          <p className="text-sm dark:text-gray-200 leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-400">
                              Model Number:{" "}
                            </span>{" "}
                            {product.product.productModelNumber}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between space-x-8 items-start w-full">
                        <p className="text-base dark:text-gray-200 xl:text-lg leading-6">
                          ${product.product.productPrice}{" "}
                          <span className="text-red-300 line-through">
                            {" "}
                            {/* $45.00 */}
                          </span>
                        </p>
                        <p className="text-base dark:text-gray-200 xl:text-lg leading-6 text-gray-800">
                          {product.quantity}
                        </p>
                        <p className="text-base dark:text-gray-200 xl:text-lg font-semibold leading-6 text-gray-800">
                          ${product.product.productPrice*product.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                    
                    )
                   
                  })}
                </div>
                <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8 ">
                  <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-[#171717] space-y-6 rounded-lg shadow-xl">
                    <h3 className="text-xl dark:text-gray-200 font-semibold leading-5 text-gray-800">
                      Summary
                    </h3>
                    <div className="flex justify-center items-center w-full space-y-4 flex-col border-teal-500 dark:border-teal-700 border-b pb-4">
                      <div className="flex justify-between w-full">
                        <p className="text-base dark:text-gray-200 leading-4 text-gray-800">
                          Sub-Total
                        </p>
                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                          ${total.totalPrice}
                        </p>
                      </div>
                      {/* <div className="flex justify-between items-center w-full">
                        <p className="text-base dark:text-gray-200 leading-4 text-gray-800">
                          Discount{" "}
                          <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                            STUDENT
                          </span>
                        </p>
                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                          -$28.00 (50%)
                        </p>
                      </div> */}
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base dark:text-gray-200 leading-4 text-gray-800">
                          Quantity
                        </p>
                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                          {total.totalQuantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base dark:text-gray-200 font-semibold leading-4 text-gray-800">
                        Total
                      </p>
                      <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                        ${total.totalPrice}
                      </p>
                    </div>
                  </div>
                  {/* <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                      Shipping
                    </h3>
                    <div className="flex justify-between items-start w-full">
                      <div className="flex justify-center items-center space-x-4">
                        <div className="w-8 h-8">
                          <img
                            className="w-full h-full"
                            alt="logo"
                            src="https://i.ibb.co/L8KSdNQ/image-3.png"
                          />
                        </div>
                        <div className="flex flex-col justify-start items-center">
                          <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                            DPD Delivery
                            <br />
                            <span className="font-normal">
                              Delivery with 24 Hours
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">
                        $8.00
                      </p>
                    </div>
                    <div className="w-full flex justify-center items-center">
                      <button className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                        View Carrier Details
                      </button>
                    </gray-200                  </div> */}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-[#171717] w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col  rounded-lg shadow-xl">
                <h3 className="text-xl dark:text-gray-200 font-semibold leading-5 text-gray-800">
                  Customer
                </h3>
                <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                  <div className="flex flex-col justify-start items-start flex-shrink-0">
                    <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-teal-500 dark:border-teal-700">
                      <img
                      className="h-10 rounded-full"
                        src={user.userId.profile}
                        alt="avatar"
                      />
                      <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-base dark:text-gray-200 font-semibold leading-4 text-left text-gray-800">
                          {user.name}
                        </p>
                        {/* <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">
                          10 Previous Orders
                        </p> */}
                      </div>
                    </div>

                    <div className="flex justify-center text-gray-800 dark:text-gray-200 md:justify-start items-center space-x-4 py-4 border-b border-teal-500 dark:border-teal-700 w-full">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 7L12 13L21 7"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="cursor-pointer text-sm leading-5 ">
                        {user.userId.email}
                      </p>
                    </div>
                    <div className="flex justify-center text-gray-800 dark:text-gray-200 md:justify-start items-center space-x-4 py-4 border-b border-teal-500 dark:border-teal-700 w-full">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 7L12 13L21 7"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="cursor-pointer text-sm leading-5 ">
                        {user.phoneNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                    <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                        <p className="text-base dark:text-gray-200 font-semibold leading-4 text-center md:text-left text-gray-800">
                          Shipping Address
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                        {user.shippingAddress}, {user.city}, {user.state}

                        </p>
                      </div>
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                        <p className="text-base dark:text-gray-200 font-semibold leading-4 text-center md:text-left text-gray-800">
                          Billing Address
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {user.shippingAddress}, {user.city}, {user.state}
                        </p>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, params }) {
  const id = params.orderId;
  const token = req.cookies.jwt;
  const result = await fetch(BASE_URL + "my-order/" + id, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  const res = await result.json();
  let order;
  if (result.status == 201) {
    order = res.order;
  } else if (result.status == 433) {
    toast({
      title: res.message,
      status: "error",
      isClosable: true,
    });
  }
  return {
    props: {
      order: order,
    },
  };
}
