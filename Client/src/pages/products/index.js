import ProductCard from "../../../components/products/productCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../helper/helper";
import { useSelector, useDispatch } from "react-redux";
import { cart, total } from "@/store/userInfoSlice";
import Footer from "../../../components/footer/footer";
import { Pagination } from "@nextui-org/react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ProductBar from "../../../components/Navbar/ProductsBar";
export default function Products() {
  const [productPage, setproductPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [productFilter, setproductFilter] = useState(" ");
  const dispatch = useDispatch();
  const [products, setproducts] = useState([]);
  const token = useSelector((state) => state.auth.userToken);
  const router = useRouter();
  const toast = useToast();
  useEffect(() => {
    const fetchProducts = async () => {
      const result = await fetch(
        BASE_URL + "products?page=" + productPage + "&filter=" + productFilter
      );
      const res = await result.json();
      if (result.status == 201) {
        setproducts(res.products);
        const pages = Math.ceil(res.totalProducts / 4);
        setTotalPages(pages);
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
  }, [productPage, totalPages, productFilter]);
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
    setproductPage(event);
  };
  const changeProductsHandler=(event)=>{
    setproductFilter(event)
    paginationHandler(1)
  }
  return (
    <>
      <div className="min-h-screen pt-28 transition-colors md:pt-20 bg-[#f9f9f9] dark:bg-[#202020]  p-4 sm:px-8">
        <ProductBar onChangeProducts={changeProductsHandler}/>
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
            total={totalPages}
            initialPage={1}
            page={productPage}
            onChange={paginationHandler}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
