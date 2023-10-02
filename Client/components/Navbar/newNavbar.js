import { Navbar } from "flowbite-react";
import Link from "next/link";
import ThemeButton from "./themeToggler";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { login } from "@/store/authSlice";
import { info } from "@/store/userInfoSlice";
import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";

export default function NewNavbar() {
  const [collapse, setcollapse] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    hiddenHandler();
    dispatch(login(false));
    dispatch(info({}));
    router.push("/");
  };

  const hiddenHandler = (event) => {
    setcollapse((state) => !state);
  };
  return (
    <div className="fixed top-0 z-50 w-full firefox:bg-opacity-90 dark:bg-white navbar">
      <div className="flex justify-between shadow-md" style={{padding : "1.5rem 2rem"}}>
        <Link href="/" className="flex align-center"> 
          <img
            src="/img/carbonLogo.png"
            className=" h-6 self-center mr-3"
            alt="MyLogo"
          />
          <p className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Carbon
          </p>
        </Link>
        
        <div className="flex self-center items-center md:hidden gap-2 text-black dark:text-white">
          <Hamburger duration={0.4} size={20} toggle={hiddenHandler} rounded label="Show Menu" toggled={!collapse}/>
          <ThemeButton />
        </div>

        <div className="hidden md:flex gap-6">
          <div>
            <Link
              className="navlinkWhite dark:text-white "
              href="/"
              
            >
              Home
            </Link>
          </div>
          <div>
            <Link
              className="navlinkWhite dark:text-white"
              href="/about-us"
              
            >
              About
            </Link>
          </div>
          <div>
            <Link
              className="navlinkWhite dark:text-white"
              href="/products"
              
            >
              Products
            </Link>
          </div>
          {!isAuth && (
            <div>
              <Link
                className="navlinkWhite dark:text-white"
                href="/auth/login"
                
              >
                Login
              </Link>
            </div>
          )}
          {!isAuth && (
            <div>
              <Link
                className="navlinkWhite dark:text-white"
                href="/auth/signUp"
                
              >
                Signup
              </Link>
            </div>
          )}
          {isAuth && (
            <div>
              <Link
                className="navlinkWhite dark:text-white"
                href="/account"
                
              >
                Account
              </Link>
            </div>
          )}
          {isAuth && (
            <div>
              <button
                className="navlinkWhite text-left dark:text-white"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </div>
          )}

          <ThemeButton />
        </div>
      </div>
      <div className={collapse ? "hidden" : "block md:hidden "}>
        <div className="flex flex-col pl-8 gap-4 py-4   border-gray-400 mobileNavbar ">
            <Link
              className="navlinkWhite dark:text-white "
              href="/"
              style={{
                fontSize: "1.2rem",
                paddingTop: "4px",
                width: "100%",
                marginBottom: "12px",
              }}
              onClick={hiddenHandler}
            >
              Home
            </Link>
         
            <Link
              className="navlinkWhite dark:text-white"
              href="/"
              style={{
                fontSize: "1.2rem",
                paddingTop: "4px",
                width: "100%",
                marginBottom: "12px",
              }}
              onClick={hiddenHandler}
            >
              About
            </Link>
            <Link
              className="navlinkWhite dark:text-white"
              href="/products"
              style={{
                fontSize: "1.2rem",
                paddingTop: "4px",
                width: "100%",
                marginBottom: "12px",
              }}
              onClick={hiddenHandler}
            >
              Products
            </Link>
          {!isAuth && (
              <Link
                className="navlinkWhite dark:text-white"
                href="/auth/login"
                style={{
                  fontSize: "1.2rem",
                  paddingTop: "4px",
                  width: "100%",
                  marginBottom: "12px",
                }}
                onClick={hiddenHandler}
              >
                Login
              </Link>
          )}
          {!isAuth && (
              <Link
                className="navlinkWhite dark:text-white"
                href="/auth/signUp"
                style={{
                  fontSize: "1.2rem",
                  paddingTop: "4px",
                  width: "100%",
                  marginBottom: "12px",
                }}
                onClick={hiddenHandler}
              >
                Signup
              </Link>
          )}
          {isAuth && (
              <Link
                className="navlinkWhite dark:text-white"
                href="/account"
                style={{
                  fontSize: "1.2rem",
                  paddingTop: "4px",
                  width: "100%",
                  marginBottom: "12px",
                }}
                onClick={hiddenHandler}
              >
                Account
              </Link>
          )}
          {isAuth && (
              <button
                className="navlinkWhite text-left dark:text-white"
                style={{
                  fontSize: "1.2rem",
                  paddingTop: "4px",
                  width: "100%",
                  marginBottom: "12px",
                }}
                onClick={logoutHandler}
              >
                Logout
              </button>
          )}
        </div>
      </div>
    </div>
  );
}
