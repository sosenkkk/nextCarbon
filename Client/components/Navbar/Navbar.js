// import React from "react";
// import {Navbar, NavbarBrand,NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
// import { Bs0Circle } from "react-icons/bs";
// // import Link from "next/link";
// import ThemeButton from "./themeToggler";
// import { useSelector, useDispatch } from "react-redux";
// import { useRouter } from "next/router";
// import { login } from "@/store/authSlice";
// import { info, cart } from "@/store/userInfoSlice";
// import { useState } from "react";
// import { Squash as Hamburger } from "hamburger-react";
// import CartButton from "../cart/cartButton";
// import { BASE_URL } from "../../helper/helper";

// export default function AdminNavbar() {
//   const [isMenuOpen, setIsMenuOpen] = React.useState(false);
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const isAuth = useSelector((state) => state.auth.isAuthenticated);
//   const logoutHandler = async() => {
//     const result = await fetch(BASE_URL + 'logout',{
//       headers:{
//         "Content-type":'application/json'
//       },
//       credentials: "include",
//     })
//     const res = await result.json();
    
//     localStorage.removeItem("token");
//     localStorage.removeItem("expiryDate");
//     localStorage.removeItem("userId");
//     hiddenHandler();
//     dispatch(login(false));
//     dispatch(info({}));
//     dispatch(cart([]));
//     setTimeout(()=>{
//       router.push("/");
//     },500)

//   };


//   const menuItems = [
//     "Profile",
//     "Dashboard",
//     "Activity",
//     "Analytics",
//     "System",
//     "Deployments",
//     "My Settings",
//     "Team Settings",
//     "Help & Feedback",
//     "Log Out",
//   ];

//   return (
//     <Navbar onMenuOpenChange={setIsMenuOpen}>
//       <NavbarContent>
//         <NavbarMenuToggle
//           aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//           className="sm:hidden"
//         />
//         <NavbarBrand>
//         <img
//             src="/img/carbonLogo.png"
//             className=" h-6 self-center mr-3"
//             alt="MyLogo"
//           />
//           <p className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
//             Carbon
//           </p>
//         </NavbarBrand>
//       </NavbarContent>

//       <NavbarContent className="hidden sm:flex gap-4" justify="center">
//         <NavbarItem>
//           <Link color="foreground" href="/">
//             Home
//           </Link>
//         </NavbarItem>
//         <NavbarItem isActive>
//           <Link href="/about-us" >
//             About Us
//           </Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Link color="foreground" href="/products">
//             Products
//           </Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Link color="foreground" href="/products">
//             Products
//           </Link>
//         </NavbarItem>
//       </NavbarContent>
//       <NavbarContent justify="end">
//         <NavbarItem className="hidden lg:flex">
//           <Link href="#">Login</Link>
//         </NavbarItem>
//         <NavbarItem>
//           <ThemeButton />
//         </NavbarItem>
//       </NavbarContent>
//       <NavbarMenu>
//         {menuItems.map((item, index) => (
//           <NavbarMenuItem key={`${item}-${index}`}>
//             <Link
//               color={
//                 index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
//               }
//               className="w-full"
//               href="#"
//               size="lg"
//             >
//               {item}
//             </Link>
//           </NavbarMenuItem>
//         ))}
//       </NavbarMenu>
//     </Navbar>
//   );
// }
