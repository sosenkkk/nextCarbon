import { BASE_URL } from "../../../../helper/helper";
import { useToast } from "@chakra-ui/react";
import RequestBar from "../../../../components/Navbar/requestBar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/router";
export default function ViewOrders(props) {
  const router = useRouter()
  const [admin, setAdmin] = useState(false);
  const toast = useToast();
  const [sort, setsort] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [page, setpage] = useState(1);
  const [orders, setorders] = useState();
  const fetchData = async (token) => {
    const result = await fetch(
      BASE_URL + `view-orders?page=${page}&sort=${sort}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const res = await result.json();
    if (result.status == 201) {
      setAdmin(true);
      const pages = Math.ceil(res.totalOrders / 5);
      setTotalPages(pages);
      setorders(res.orders);
    } else if (result.status == 433) {
      toast({
        title: res.message,
        status: "error",
        isClosable: true,
      });
    }else{
      router.push("/404")
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchData(token);
    setTotalPages(Math.ceil(props.totalOrders / 5));
  }, [sort, page]);
  
  const paginationHandler = (event) => {
    setpage(event);
  };
  const sortRequestHandler = (event) => {
    setsort(event);
    setpage(1);
  };
  return (
    <>
      {admin && (
        <div className=" min-h-[600px] pt-28 transition-colors md:pt-24 bg-[#f7f7f7] dark:bg-[#202020] p-4 sm:px-8  ">
          <RequestBar onsortProducts={sortRequestHandler} />

          {orders.length != 0 && (
            <>
              <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <caption className="p-5 text-lg font-semibold text-left text-gray-800 bg-white dark:text-gray-200 dark:bg-[#171717]">
                    Orders Placed
                    <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Orders placed by customer before.
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
                            href={`/admin/view-orders/${product.id}`}
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
              <div className="flex justify-center py-4 bg-[#f9f9f9] dark:bg-[#202020] transition">
                <Pagination
                  showShadow
                  color="secondary"
                  total={totalPages}
                  initialPage={1}
                  page={page}
                  onChange={paginationHandler}
                />
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
    </>
  );
}
