import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import ProfilePicture from "../../../components/account/profilePicture";
import { BASE_URL } from "../../../helper/helper";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { fetchUserData } from "@/store/userInfoSlice";
import { Spinner } from "@nextui-org/react";

export default function Details() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [buttondisabled, setbuttondisabled] = useState(false)
  const [profileImage, setProfileImage] = useState(null);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const token = useSelector((state) => state.auth.userToken);
  const toast = useToast();

  const dispatch = useDispatch();
  const router = useRouter();
  const imageSelect = (file) => {
    if (file) {
      setProfileImage(file);
    }
  };
  const validationHandler = (firstName, lastName, image) => {
    if (firstName.trim().length == 0 && lastName.trim().length == 0) {
      if (!image) {
        return false;
      }
    }
    return true;
  };
  const changeDetailHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const validation = validationHandler(
      firstNameRef.current.value,
      lastNameRef.current.value,
      profileImage
    );
    if (validation) {
      setbuttondisabled(true)
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
      setbuttondisabled(false)
      router.push("/account/details");
        toast({
          title: res.message,
          status: "error",
          isClosable: true,
        });
      } else if (response.status == 201) {
      setbuttondisabled(false)
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
      <div className="min-h-[500px] bg-[#fff] dark:bg-[#111111]">
        <div className="p-8 pt-28 md:pt-24  flex align-center justify-around w-full h-100">
          <form
            onSubmit={changeDetailHandler}
            action="#"
            className="bg-[#f7f7f7] dark:bg-[#171717] rounded-lg shadow-xl max-w-xl p-4 sm:p-12 md:p-16 w-full"
          >
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <ProfilePicture
                imgSrc={userInfo.profile}
                onImageSelect={imageSelect}
              />

              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-700 block w-full p-2.5 dark:bg-[#262626] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white  dark:focus:border-teal-700"
                  placeholder={userInfo.firstName}
                  ref={firstNameRef}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="last_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="last_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-700 block w-full p-2.5 dark:bg-[#262626] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white  dark:focus:border-teal-700"
                  placeholder={userInfo.lastName}
                  ref={lastNameRef}
                />
              </div>
            </div>
            <div className="mb-6 col-span-2 sm:col-span-1">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email address
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
          

            {
                    !buttondisabled && 
                    <button
                    type="submit"
                    className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                  >
                    Submit
                  </button>
                  }
                {
                    buttondisabled && 
                    <div
                    className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-1 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 cursor-not-allowed"
                  >
                    <Spinner />
                  </div>
                  }
          </form>
        </div>
      </div>
    </>
  );
}
