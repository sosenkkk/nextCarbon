import { Select, SelectItem } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { login } from "@/store/authSlice";
import { info, cart } from "@/store/userInfoSlice";
import { useState } from "react";
import { BASE_URL } from "../../helper/helper";

export default function ProductBar(props) {
  const [collapse, setcollapse] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const logoutHandler = async () => {
    const result = await fetch(BASE_URL + "logout", {
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    const res = await result.json();

    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    hiddenHandler();
    dispatch(login(false));
    dispatch(info({}));
    dispatch(cart([]));
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  const hiddenHandler = (event) => {
    props.onChangeProducts(event.target.value)
  };
  const productsCategory = ["Sink Cock", "Angle Cock", "Wall Mixer"];
  const sortCategory = ["Ascending", "Descending"];
  return (
    <div className="w-100 dark:text-white flex gap-4 justify-end items-center p-2 flex-col sm:flex-row">
      <Select
        size="sm"
        label="Category"
        placeholder="Filter Category"
        className="max-w-xs "
        onChange={hiddenHandler}
      >
        {productsCategory.map((category) => (
          <SelectItem
            className="max-w-xs dark:text-white"
            key={category}
            value={category}
          >
            {category}
          </SelectItem>
        ))}
      </Select>
      <Select onChange={hiddenHandler} size="sm" label="Sort" className="max-w-xs ">
      {sortCategory.map((category) => (
          <SelectItem
            className="max-w-xs dark:text-white"
            key={category}
            value={category}
          >
            {category}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
