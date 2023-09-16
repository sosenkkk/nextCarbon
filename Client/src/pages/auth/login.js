import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { BASE_URL } from "../../../helper/helper";
import { useDispatch } from "react-redux";
import { login, userToken } from "@/store/authSlice";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  useEffect(()=>{
    if(localStorage.getItem("token")){
      router.push('/')
    }
  })
  const toast = useToast();
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const disptach = useDispatch();
  const validateEmail = new RegExp(
    /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/
  );

  const  logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    router.push('/')
  };
  
  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

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

  const loginHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const enteredData = { email: email, password: password };
    const validation =
      validateEmailHandler(enteredData.email) &&
      validatePasswordHandler(enteredData.password);
    if (validation) {
      const response = await fetch(BASE_URL + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: enteredData.email,
          password: enteredData.password,
        }),
      });
      const res = await response.json();

      if (response.status == 433) {
        router.push("/auth/login");
        toast({
          title: res.message,
          status: "error",
          isClosable: true,
        });
      } else if (response.status == 403) {
        router.push("/auth/login");
        toast({
          title: res.message,
          status: "error",
          isClosable: true,
        });
      } else if (response.status == 201) {
        disptach(userToken(res.token))
        toast({
          title: res.message,
          status: "success",
          isClosable: true,
        });
        localStorage.setItem("token", res.token)
        localStorage.setItem("userId", res.userId)
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        disptach(login(true));
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        setAutoLogout(remainingMilliseconds);
        router.push("/");
      }
    } else {
      router.push("/auth/login");
    }
  };
  return (
    
    <>
      <section className="bg-light-theme dark:bg-dark-theme ">
        <div className="flex flex-col h-screen items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#252525] dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Log in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={loginHandler}
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
                    ref={emailRef}
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
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
                    ref={passwordRef}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  {/* <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-purple-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-600 dark:ring-offset-gray-800" required="" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div> */}
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm font-medium text-purple-600 hover:underline dark:text-purple-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account yet?{" "}
                  <Link
                    href="/auth/signUp"
                    className="font-medium text-purple-600 hover:underline dark:text-purple-500"
                  >
                    Sign up
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

export default Login;
