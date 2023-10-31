import { useToast } from "@chakra-ui/react";
import { BASE_URL } from "../../../helper/helper";
import { Spinner } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyOrders() {
  const [productsLoaded, setproductsLoaded] = useState(false);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const fetchData = async (token) => {
    const result = await fetch(BASE_URL + "my-orders", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      credentials: "include",
    });
    const res = await result.json();
    console.log(res)

    if (result.status == 201) {
      setOrders(res.orders);
      setMessage(res.message);
      setproductsLoaded(true);
    } else if (result.status == 404) {
      setOrders([]);
      setproductsLoaded(true);
    } else {
      setMessage(res.message);
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    setproductsLoaded(false);
    const token = localStorage.getItem("token");
    fetchData(token);
  }, []);

  return (
    <>
      {productsLoaded && (
        <div className=" min-h-[500px] pt-28 transition-colors md:pt-24 bg-[#f7f7f7] dark:bg-[#202020] p-4 sm:px-8  ">
          {orders.length != 0 && (
            <>
              <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <caption className="p-5 text-lg font-semibold text-left text-gray-800 bg-white dark:text-gray-200 dark:bg-[#171717]">
                    Your Orders
                    <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Orders you've placed before.
                    </p>
                  </caption>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#111111] dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Ship to
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Order Placed
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Total Quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Total Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((product) => (
                      <tr
                        key={product.id}
                        className="bg-white border-b dark:bg-[#171717] dark:border-[#111]"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {product.user.name}
                        </th>
                        <td className="px-6 py-4 dark:text-white">
                          {product.orderPlaced}
                        </td>

                        <td className="px-6 py-4 dark:text-white">
                          {product.total.totalQuantity}
                        </td>
                        <td className="px-6 py-4 dark:text-white">
                          ₹{product.total.totalPrice}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/account/${product.id}`}
                            id={product.id}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {orders.length === 0 && (
            <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-lg font-semibold text-left text-gray-800 bg-white dark:text-gray-200 dark:bg-[#171717]">
                  Your have placed no orders.
                  <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                    Continue shopping. Add{" "}
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
      )}
      {!productsLoaded && (
        <div className="min-h-[500px] pt-28 transition-colors md:pt-20 bg-[#f9f9f9] dark:bg-[#202020]  p-4 sm:px-8 py-0 flex items-center justify-around">
          <Spinner size="lg" color="secondary" />
        </div>
      )}
    </>
  );
}
