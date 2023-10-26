import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { BASE_URL } from "../../helper/helper";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { fetchUserData } from "@/store/userInfoSlice";

export default function ContactUs() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const messageRef = useRef();
  const token = useSelector((state) => state.auth.userToken);
  const toast = useToast();

  const dispatch = useDispatch();
  const router = useRouter();

  const validationHandler = (firstName, lastName, image) => {
    if (firstName.trim().length == 0 && lastName.trim().length == 0) {
      if (!image) {
        return false;
      }
    }
    return true;
  };

  const contactHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const validation = validationHandler(
      firstNameRef.current.value,
      lastNameRef.current.value,
      profileImage
    );
    if (validation) {
      formData.append("firstName", firstNameRef.current.value);
      formData.append("lastName", lastNameRef.current.value);
      formData.append("image", profileImage);
      const response = await fetch(BASE_URL + "edit-info", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });
      const res = await response.json();
      if (response.status == 433) {
        router.push("/account/details");
        toast({
          title: res.message,
          status: "error",
          isClosable: true,
        });
      } else if (response.status == 201) {
        toast({
          title: res.message,
          status: "success",
          isClosable: true,
        });
        dispatch(fetchUserData(token));
        router.push("/account");
      }
    } else {
      router.push("/account/details");
      toast({
        title: "Nothing is Changed",
        status: "error",
        isClosable: true,
      });
    }
  };
  return (
    <>
      <div className="min-h-[600px] bg-[#fff] dark:bg-[#111111] transition-colors">
        <div className="p-8 pt-28 md:pt-24  flex align-center justify-around w-full h-100">
          <form
            onSubmit={contactHandler}
            action="#"
            className="bg-[#f7f7f7] dark:bg-[#171717] rounded-lg shadow-xl max-w-xl p-4 pt-6 sm:py-8 sm:px-12   w-full"
          >
            <h1 className="text-3xl sm:text-4xl text-gray-800 dark:text-gray-300 mb-4">
              Contact us
            </h1>

            <div className="mb-6 col-span-2 sm:col-span-1">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Email address
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-700 block w-full p-2.5 dark:bg-[#262626] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white  dark:focus:border-teal-700"
                placeholder={userInfo.email}
                readOnly
                style={{ cursor: "not-allowed" }}
              />
            </div>
            <div className="mb-6 col-span-2 sm:col-span-1">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                ref={messageRef}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-700 block w-full p-2.5 dark:bg-[#262626] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white  dark:focus:border-teal-700"
                placeholder="What you wanna talk about?"
              />
            </div>

            <button
              type="submit"
              className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
