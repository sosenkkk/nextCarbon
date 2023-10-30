import { BASE_URL } from "../../../../helper/helper";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BiLogoGmail } from "react-icons/bi";
import { useSelector } from "react-redux";
import {  useEffect, useState } from "react";
import Modal from "../../../../components/Modal";

export default function Requests(props) {
  const router = useRouter();
  const [request, setRequest]=useState()
  const token = useSelector((state) => state.auth.userToken);
  const toast = useToast();
  const fetchData = async (token, reqId)=>{
  const URL = BASE_URL + "view-requests/" + reqId;
  const result = await fetch(URL, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  const res = await result.json();
  let request;
  if (result.status == 201) {
    setRequest(res.request) ;
    
  } else {
    router.push("/404")
  }
  }
  useEffect(()=>{
    if(router.isReady){
      const reqId = router.query.request;
      const token = localStorage.getItem("token")
      fetchData(token,reqId)
    }
  },[router.isReady])
  const [isModalOpen, setModalOpen] = useState(false);
    const openModal = (id) => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };
    
    const deleteHandler = async (event) => {
      const id = request._id;
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
        router.push("/admin/view-requests")
      } else if (result.status == 433) {
        toast({
          title: res.message,
          status: "error",
          isClosable: true,
        });
        router.reload()
  
      }
    };
  return (
    <>{request &&
      <div className="  pt-28 transition-colors md:pt-24 bg-[#f7f7f7] pb-12 dark:bg-[#202020] text-gray-800 dark:text-gray-200  ">
        <section className="text-center mb-4">
          <h1 className="sm:text-xl md:text-2xl font-bold border-b-2 inline">
            Request Id - {request._id}
          </h1>
        </section>
        <section className="max-w-2xl shadow-xl rounded-lg px-6 py-8 mx-auto bg-white dark:bg-[#171717]">
          <h3 className="text-xl dark:text-gray-300 font-semibold leading-5 text-gray-800">
            Customer Details
          </h3>
          <div className="flex flex-col   justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-teal-500 dark:border-teal-700">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={request.user.profile}
                  alt="avatar"
                />
                <div className="flex justify-start items-start flex-col space-y-2">
                  <p className="text-base dark:text-gray-300 font-semibold leading-4 text-left text-gray-800">
                    {request.user.firstName} {request.user.lastName}
                  </p>
                </div>
              </div>

              <div className="flex justify-center text-gray-800 dark:text-gray-300 md:justify-start items-center space-x-4 py-4 border-b border-teal-500 dark:border-teal-700 w-full">
                <BiLogoGmail fontSize={"20px"} />
                <p className="cursor-pointer text-sm leading-5 ">
                  {request.user.email}
                </p>
              </div>
            </div>
            <h3 className="my-4 text-lg md:text-xl font-bold">
              Request Content
            </h3>
            <p>{request.message}</p>
          </div>
          <div className="w-full flex items-end justify-end mt-4">
            <button className="cartBtn" style={{background:"rgb(242, 76, 61)"}} onClick={openModal}>Delete</button>
          </div>
        </section>
        <Modal isOpen={isModalOpen} onClose={closeModal} maxWidth="500px">
                <div className="px-8 rounded-lg py-4 bg-[#f7f7f7]  dark:bg-[#171717] text-gray-800 dark:text-gray-200">
                  <h2 className="text-lg text-center sm:text-xl font-semibold mb-4">
                    Click "Yes" to delete the Product.
                  </h2>
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:justify-around">
                    <button className="cartBtn" onClick={deleteHandler}>
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
      </div>}
    </>
  );
}

// export async function getServerSideProps(context) {
//   const token = context.req.cookies.jwt;
  
  
// }
