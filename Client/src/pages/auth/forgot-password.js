import { useRef } from "react";
import Link from "next/link";
import { BASE_URL } from "../../../helper/helper";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

const ForgotPassword = (props) => {
  const toast = useToast();
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const validateEmail = new RegExp(
    /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/
  );
  const validateEmailHandler = (email) => {
    if (validateEmail.test(email)) {
      return true;
    } else {
      toast({
        title: "Enter correct email address",
        status: "error",
        isClosable: true,
      });
      return false;
    }
  };
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
  const validateConfirmPasswordHandler=(password, confirmpassword)=>{
    if (password.trim()===confirmpassword.trim()) {
      return true;
    } else {
      toast({
        title: "Passwords does not match.",
        status: "error",
        isClosable: true,
      });
      return false;
    }
  };
  
  const signUpHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmpassword = confirmPasswordRef.current.value;
    const validation =
      validateEmailHandler(email) &&
      validatePasswordHandler(password) &&
      validateConfirmPasswordHandler(password, confirmpassword);
      if(validation){
        const response = await fetch(BASE_URL + "change-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        const res = await response.json();
        if(response.status==433){
          router.push("/auth/forgot-password");
          toast({
            title: res.message,
            status: "error",
            isClosable: true,
          });
        }else if (response.status == 201) {
          toast({
            title: res.message,
            status: "success",
            isClosable: true,
          });
          router.push("/auth/login");
        }
        ;
      }else{
        router.push("/auth/forgot-password");

      }
    
  };
  return (
    <>
      <section className="bg-light-theme dark:bg-dark-theme  ">
        <div className="flex flex-col h-screen items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#252525] dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Change your password
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={signUpHandler}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="namecompany@any.com"
                    readOnly
                    style={{cursor:"not-allowed"}}
                    ref={emailRef}
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    ref={confirmPasswordRef}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                  >
                    Change Password
                  </button>
                </div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account yet?{" "}
                  <Link
                    href="/auth/login"
                    className="font-medium text-purple-600 hover:underline dark:text-purple-500"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;