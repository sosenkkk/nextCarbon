import ProductCard from "../../../components/products/productCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../helper/helper";
import { useSelector, useDispatch } from "react-redux";
import ProductBar from "../../../components/Navbar/ProductBar";
import { cart, total } from "@/store/userInfoSlice";
import Footer from "../../../components/footer/footer";
import { Pagination } from "@nextui-org/react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  setProductPage,
  setTotalProductPages,
  setFilter,
  setSort
} from "@/store/productSlice";

export default function Products() {
  const productPage = useSelector((state) => state.product.productPage);
  const productSort = useSelector((state) => state.product.productSort) || "";
  const totalProductPages = useSelector(
    (state) => state.product.totalProductPages
  );
  const productFilter = useSelector((state) => state.product.productFilter) || "";
  const dispatch = useDispatch();
  const [products, setproducts] = useState([]);
  const token = useSelector((state) => state.auth.userToken);
  const router = useRouter();
  const toast = useToast();
  useEffect(() => {
    const fetchProducts = async () => {
      const result = await fetch(
        BASE_URL + `products?page=${productPage}&filter=${productFilter}&sort=${productSort}`
      );
      const res = await result.json();
      if (result.status == 201) {
        setproducts(res.products);
        const pages = Math.ceil(res.totalProducts / 8);
        dispatch(setTotalProductPages(pages));
      } else {
        router.push("/");
        toast({
          title: res.message,
          status: "error",
          isClosable: true,
        });
      }
    };
    fetchProducts();
    console.log(products)
  }, [productPage, totalProductPages, productFilter, productSort]);
  const cartChangeHandler = async (id) => {
    const productId = id;
    const result = await fetch(BASE_URL + "cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        productId: productId,
      }),
    });
    const res = await result.json();
    console.log(res);
    if (result.status == 201) {
      dispatch(cart(res.cart));
      dispatch(total(res.total));
    } else if (result.status == 433) {
      console.log("noo");
    }
  };
  const paginationHandler = (event) => {
    dispatch(setProductPage(event));
  };
  const changeProductsHandler = (event) => {
    dispatch(setFilter(event));
    dispatch(setProductPage(1));
  };
  const sortProductsHandler = (event) => {
    dispatch(setSort(event));
    dispatch(setProductPage(1));
  };
  return (
    <>
      <div className=" pt-28 transition-colors md:pt-20 bg-[#f9f9f9] dark:bg-[#202020]  p-4 sm:px-8 py-0">
        <ProductBar onChangeProducts={changeProductsHandler} onsortProducts={sortProductsHandler}/>
        <div className="  gap-4   gap-y-8 productContainerHolder">
          {products.map((product) => (
            <ProductCard
              image={product.productImage}
              name={product.productName}
              model={product.productModel}
              price={product.productPrice}
              modelNo={product.productModelNumber}
              key={product._id.toString()}
              id={product._id.toString()}
              onAddCart={cartChangeHandler}
            />
          ))}
        </div>
        <div className="flex justify-center py-4 bg-[#f9f9f9] dark:bg-[#202020] transition">
          <Pagination
            showShadow
            color="secondary"
            total={totalProductPages}
            initialPage={1}
            page={productPage}
            onChange={paginationHandler}
          />
        </div>
      </div>
    </>
  );
}
