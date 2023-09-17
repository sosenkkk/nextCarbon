import { useRef } from "react";
import { BASE_URL } from "../../../helper/helper";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const ChangePassword = (props) => {
  const userInfo = useSelector(state=>state.user.userInfo)

  const toast = useToast();
  const router = useRouter();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  
  const validatePasswordHandler = (password) => {
    if (password.trim().length > 5) {
      return true;
    } else {
      toast({
        title: "Password must contain atleast 6 characters.",
        status: "error",
        isClosable: true,
      });
      return false;
    }
  };
  const validateConfirmPasswordHandler = (
    oldpassword,
    newpassword,
    confirmpassword
  ) => {
    if (newpassword.trim() === oldpassword.trim()) {
      toast({
        title: "Old and new password cannot be same.",
        status: "error",
        isClosable: true,
      });
    } else {
      if (newpassword.trim() === confirmpassword.trim()) {
        return true;
      } else {
        toast({
          title: "Passwords does not match.",
          status: "error",
          isClosable: true,
        });
        return false;
      }
    }
  };

  const forgotPasswordHandler = async (event) => {
    event.preventDefault();
    const email = userInfo.email;
    const oldpassword = oldPasswordRef.current.value;
    const newpassword = passwordRef.current.value;
    const confirmpassword = confirmPasswordRef.current.value;

    const validation =
      validatePasswordHandler(oldpassword) &&
      validatePasswordHandler(newpassword) &&
      validateConfirmPasswordHandler(oldpassword, newpassword, confirmpassword);
    if (validation) {
      const response = await fetch(BASE_URL + "change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          oldpassword: oldpassword,
          newpassword: newpassword,
        }),
      });
      const res = await response.json();
      if (response.status == 433) {
        router.push("/account/change-password");
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
        router.push("/account");
      }
    } else {
      router.push("/account/change-password");
    }
  };
  return (
    <>
      <section className="bg-[#fff] dark:bg-[#252525] pt-12 md:pt-10 ">
        <div className="flex flex-col h-screen items-center justify-center px-6 py-8 mx-auto md:h-screen ">
          <div className="w-full bg-[#f7f7f7] dark:bg-[#171717]  rounded-lg shadow-md  p-4 sm:max-w-xl  ">
            <div className="p-4 space-y-4  sm:p-8 sm:pt-4">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl dark:text-gray-200">
              Hello {userInfo.firstName} {userInfo.lastName} !
              </h1>
              <form
                className="space-y-4"
                action="#"
                onSubmit={forgotPasswordHandler}
              >
                <div>
                  
                  <h3 className="block mb-2  font-medium text-gray-900 dark:text-gray-300">{userInfo.email}</h3>
                </div>
                <div>
                  <label
                    htmlFor="oldPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Old Password
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    id="oldPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-700 block w-full p-2.5 dark:bg-[#262626] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-teal-700"
                    required=""
                    ref={oldPasswordRef}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-700 block w-full p-2.5 dark:bg-[#262626] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-teal-700"
                    required=""
                    ref={passwordRef}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmpassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmpassword"
                    id="confirmpassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-700 block w-full p-2.5 dark:bg-[#262626] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-teal-700"
                    required=""
                    ref={confirmPasswordRef}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="text-white mt-4 bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
