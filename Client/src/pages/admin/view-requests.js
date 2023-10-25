import { BASE_URL } from "../../../helper/helper";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import RequestBar from "../../../components/Navbar/requestBar";

export default function Requests(props) {
const requests= props.requests;
  const token = useSelector((state) => state.auth.userToken);
  const toast = useToast();
  const router = useRouter();
  const deleteRequestHandler = async (event) => {
    const id = event.target.id.toString();
   
      const result = await fetch(BASE_URL + "admin/delete-request/" + id, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        credentials:"include"
      });
      if (result.status == 201) {
        console.log("ola")
      } else if (result.status == 433) {
        toast({
          title: res.message,
          status: "error",
          isClosable: true,
        });
      }
  };
  const sortRequestHandler=(event)=>{
    console.log(event)
  }
  return (
    <>
      <div className=" min-h-screen pt-28 transition-colors md:pt-24 bg-[#f7f7f7] dark:bg-[#202020] p-4 sm:px-8  ">
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

                     
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`${product._id}`}
                          id={product._id}
                          className="font-medium text-green-600 dark:text-green-400 hover:underline"
                        >
                          View
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={deleteRequestHandler}
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
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
    const token = req.cookies.jwt;
    const result = await fetch(BASE_URL + "view-requests" , {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const res = await result.json();
    let requests;
    if (result.status == 201) {
      requests = res.requests;
    } else if (result.status == 433) {
      toast({
        title: res.message,
        status: "error",
        isClosable: true,
      });
    }
    return {
      props: {
        requests: requests,
      },
    };
  }