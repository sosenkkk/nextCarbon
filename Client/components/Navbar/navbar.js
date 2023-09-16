import { Navbar } from "flowbite-react";
import Link from "next/link";
import ThemeButton from "./themeToggler";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { login } from "@/store/authSlice";
import { info } from "@/store/userInfoSlice";

export default function MainNagivation(props) {
  const router = useRouter();
  const dispatch = useDispatch()
  const  isAuth = useSelector((state)=>state.auth.isAuthenticated);
  const  logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    dispatch(login(false))
    dispatch(info({}))
    router.push('/')
  };
  return (
    <Navbar
      fluid={true}
      rounded={true}
      className="fixed top-0 z-50 w-full firefox:bg-opacity-90 dark:bg-white border-b-2 border-gray-200 navbar "
      style={{ minHeight: "4rem", opacity: "0.95" }}
    >
      <Navbar.Brand href="/">
        <img
          src="/img/carbonLogo.png"
          className="mr-3 h-6 sm:h-9"
          alt="MyLogo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Carbon
        </span>
      </Navbar.Brand>
      <div className="flex self-center items-center md:hidden gap-2">
        <Navbar.Toggle />
       

        <ThemeButton />
      </div>

      <Navbar.Collapse style={{ marginTop: "8px", padding: "0.5rem" }}>
        <Link
         className="navlinkWhite dark:text-white "
          href="/"
          style={{
            fontSize: "1.2rem",
            paddingTop: "4px",
            width:"100%",
            marginBottom: "12px",
          }}
        >
          Home
        </Link>
        <Link
           className="navlinkWhite dark:text-white"
          href="/"
          style={{
            fontSize: "1.2rem",
            paddingTop: "4px",
            width:"100%",
            marginBottom: "12px",
          }}
        >
          About
        </Link>
        <Link
           className="navlinkWhite dark:text-white"
          href="/"
          style={{
            fontSize: "1.2rem",
            paddingTop: "4px",
            width:"100%",
            marginBottom: "12px",
          }}
        >
          Pricing
        </Link>
        {!isAuth &&
        <Link
           className="navlinkWhite dark:text-white"
          href="/auth/login"
          style={{
            fontSize: "1.2rem",
            paddingTop: "4px",
            width:"100%",
            marginBottom: "12px",
          }}
        >
          Login
        </Link>
       
        }
        {
          !isAuth && 
          <Link
          className="navlinkWhite dark:text-white"
         href="/auth/signUp"
         style={{
           fontSize: "1.2rem",
           paddingTop: "4px",
           width:"100%",
           marginBottom: "12px",
         }}
       >
         Signup
       </Link>
        }
         {isAuth &&
        <Link
           className="navlinkWhite dark:text-white"
          href="/account"
          style={{
            fontSize: "1.2rem",
            paddingTop: "4px",
            width:"100%",
            marginBottom: "12px",
          }}
        >
          Account
        </Link>
        }
        {isAuth &&
        <button
           className="navlinkWhite text-left dark:text-white"
          style={{
            fontSize: "1.2rem",
            paddingTop: "4px",
            width:"100%",
            marginBottom: "12px",
          }}
          onClick={logoutHandler}
        >
          Logout
        </button>
        }
        
        <div
          className="hidden md:block"
        >

          <ThemeButton />
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
