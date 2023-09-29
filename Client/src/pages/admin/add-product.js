import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { BASE_URL } from "../../../helper/helper";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ProductImage from "../../../components/products/productImage";
export default function AddProduct() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [productImage, setProductImage] = useState(null);
  const productModelRef = useRef();
  const productNameRef = useRef();
  const modelNumberRef = useRef();
  const token = useSelector((state) => state.auth.userToken);
  const toast = useToast();
  const router = useRouter();
  const imageSelect = (file) => {
    if (file) {
      setProductImage(file);
    }
  };
  const validationHandler = (name) => {
    if (name.trim().length > 0) {
      return true;
    }
    return false;
  };
  const changeDetailHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const productModel = productModelRef.current.value;
    const productModelNumber = modelNumberRef.current.value;
    const productName = productNameRef.current.value;
    const validation =
      validationHandler(productModel) &&
      validationHandler(productName) &&
      validationHandler(productModelNumber);
    if (validation && productImage) {
      formData.append("productModel", productModel);
      formData.append("productName", productName);
      formData.append("productModelNumber", productModelNumber);
      formData.append("image", productImage);
      const result = await fetch(BASE_URL + "add-product", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });
      const response = await result.json();
      if (result.status == 433) {
        router.push("/admin/add-product");
        toast({
          title: response.message,
          status: "error",
          isClosable: true,
        });
      } else if (result.status == 201) {
        toast({
          title: response.message,
          status: "success",
          isClosable: true,
        });
        router.push("/admin/add-product");
      }
    } else {
      toast({
        title: "All fields should be filled.",
        status: "error",
        isClosable: true,
      });
      router.push("/admin/add-product");
    }
  };
  return (
    <>
      <div className="min-h-screen bg-[#fff] dark:bg-[#111111]">
        <div className="p-8 pt-28 md:pt-24  flex align-center justify-around w-full h-100">
          <form
            onSubmit={changeDetailHandler}
            action="#"
            className="bg-[#f7f7f7] dark:bg-[#171717] rounded-lg shadow-xl max-w-xl p-4 sm:p-12 md:p-16 w-full"
          >
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div className="col-span-2 ">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Category
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-700 block w-full p-2.5 dark:bg-[#262626] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white  dark:focus:border-teal-700"
                  placeholder={userInfo.firstName}
                  ref={productModelRef}
                />
              </div>
              <div className="col-span-2 ">
                <label
                  htmlFor="last_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-700 block w-full p-2.5 dark:bg-[#262626] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white  dark:focus:border-teal-700"
                  placeholder={userInfo.lastName}
                  ref={productNameRef}
                />
              </div>
            </div>
            <div className=" mb-6 col-span-2 ">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Model number
              </label>
              <input
                type="text"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-700 block w-full p-2.5 dark:bg-[#262626] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white  dark:focus:border-teal-700"
                ref={modelNumberRef}
              />
            </div>

            <ProductImage
              imageUploaded={productImage}
              onImageSelect={imageSelect}
            />
            <button
              type="submit"
              className="text-white mt-6 bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
