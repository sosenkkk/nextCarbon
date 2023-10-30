import { BASE_URL } from "../../../../helper/helper";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import RequestBar from "../../../../components/Navbar/requestBar";
import { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import { useSelector } from "react-redux";
import Modal from "../../../../components/Modal";


export default function Requests(props) {
  const [requests, setrequests] = useState([]);
  const [admin, setAdmin]= useState(false)
  const [sort, setsort] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const token = useSelector((state)=>state.auth.userToken)
  console.log(itemToDelete)
  const openModal = (event) => {
    
    setItemToDelete(event.target.id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setItemToDelete(null)
    setModalOpen(false);
  };
  const [page, setpage] = useState(1);
  const fetchData = async (token) => {
    const result = await fetch(
      BASE_URL + `view-requests?page=${page}&sort=${sort}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const res = await result.json();
    if(result.status == 404){
      router.push("/404")
    }
    if (result.status == 201) {
      setAdmin(true)
      setrequests(res.requests);
      setTotalPages(Math.ceil(res.totalRequests / 5));
    } else if (result.status == 433) {
      toast({
        title: res.message,
        status: "error",
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchData(token);
  }, [sort, page]);
  const toast = useToast();
  const router = useRouter();
  const deleteRequestHandler = async (event) => {
    const id = itemToDelete;
    const result = await fetch(BASE_URL + "delete-request/" + id, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const res = await result.json()
    if (result.status == 201) {
      toast({
        title: res.message,
        status: "error",
        isClosable: true,
      });
      router.reload()
    } else if (result.status == 433) {
      toast({
        title: res.message,
        status: "error",
        isClosable: true,
      });
      router.reload()

    }
  };
  const paginationHandler = (event) => {
    setpage(event);
  };
  const sortRequestHandler = (event) => {
    setsort(event);
    setpage(1);
  };
  const truncateString = (str) => {
    return str.length > 20 ? str.substring(0, 17) + "..." : str;
  };
  return (
    <>
      {admin && <div className=" min-h-[600px] pt-28 transition-colors md:pt-24 bg-[#f7f7f7] dark:bg-[#202020] p-4 sm:px-8  ">
        <RequestBar onsortProducts={sortRequestHandler} />
        {requests.length != 0 && (
          <>
            <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-lg font-semibold text-left text-gray-800 bg-white dark:text-gray-200 dark:bg-[#171717]">
                  Requests
                  <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                    Requests/Complaints By Customers.
                  </p>
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#111111] dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Request Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Requested By
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Content
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">View</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((product) => (
                    <tr
                      key={product._id}
                      className="bg-white brequests-b dark:bg-[#171717] dark:brequests-[#111]"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {product._id}
                      </th>
                      <td className="px-6 py-4 dark:text-white">
                        {product.user.email}
                      </td>
                      <td className="px-6 py-4 dark:text-white">
                        {truncateString(product.message)}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`view-requests/${product._id}`}
                          id={product._id}
                          className="font-medium text-green-600 dark:text-green-400 hover:underline"
                        >
                          View
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={openModal}
                          id={product._id}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} maxWidth="500px">
                <div className="px-8 rounded-lg py-4 bg-[#f7f7f7]  dark:bg-[#171717] text-gray-800 dark:text-gray-200">
                  <h2 className="text-lg text-center sm:text-xl font-semibold mb-4">
                    Click "Yes" to delete the Product.
                  </h2>
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:justify-around">
                    <button className="cartBtn" onClick={deleteRequestHandler}>
                      Yes
                    </button>
                    <button
                      style={{ backgroundColor: "#F24C3D" }}
                      className="cartBtn"
                      onClick={closeModal}
                    >
                      No
                    </button>
                  </div>
                </div>
              </Modal>
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
        {requests.length === 0 && (
          <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <caption className="p-5 text-lg font-semibold text-left text-gray-800 bg-white dark:text-gray-200 dark:bg-[#171717]">
                No pending requests
              </caption>
            </table>
          </div>
        )}
      </div>}
    </>
  );
}

