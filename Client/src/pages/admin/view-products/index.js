import { BASE_URL } from "../../../../helper/helper";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductBar from "../../../../components/Navbar/ProductBar";
import ProductCard from "../../../../components/products/productCard";
import { Pagination } from "@nextui-org/react";

export default function AdminProducts(props) {
    const [products, setproducts] = useState([]);
    const [page, setpage] = useState(1);
    const [totalPage, settotalPage] = useState(Math.ceil(props.totalProducts / 8));
    const [filter, setfilter] = useState("");
    const [sort, setsort] = useState("");
    const router = useRouter();
    const toast = useToast();
  const fetchProducts = async (token) => {
    const result = await fetch(
      BASE_URL + `view-products?page=${page}&filter=${filter}&sort=${sort}`,{
        headers:{
            Authorization:"Bearer "+ token,
        }
      }
    );
    const res = await result.json();
    if (result.status == 201) {
      setproducts(res.products);
      const pages = Math.ceil(res.totalProducts / 8);
      settotalPage(pages);
    } else {
      router.push("/");
      toast({
        title: res.message,
        status: "error",
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token")
    fetchProducts(token);
  }, [page,  sort, filter]);
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
    if (result.status == 201) {
      dispatch(cart(res.cart));
      dispatch(total(res.total));
    } else if (result.status == 433) {
      console.log("noo");
    }
  };
  const paginationHandler = (event) => {
    setpage(event);
  };
  const changeProductsHandler = (event) => {
    setfilter(event);
    setpage(1);
  };
  const sortProductsHandler = (event) => {
    setsort(event);
    setpage(1);
  };
  return (
    <>
      <div className=" pt-28 transition-colors md:pt-20 bg-[#f9f9f9] dark:bg-[#202020]  p-4 sm:px-8 py-0">
        <ProductBar
          onChangeProducts={changeProductsHandler}
          onsortProducts={sortProductsHandler}
        />
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
              isAdmin={true}
            />
          ))}
        </div>
        <div className="flex justify-center py-4 bg-[#f9f9f9] dark:bg-[#202020] transition">
          <Pagination
            showShadow
            color="secondary"
            total={totalPage}
            initialPage={1}
            page={page}
            onChange={paginationHandler}
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const token = req.cookies.jwt;
  const result = await fetch(BASE_URL + "view-products", {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  const res = await result.json();
  let products, totalProducts;
  if (result.status == 201) {
    products = res.products;
    totalProducts = res.totalProducts;
    return {
      props: {
        products :products,
        totalProducts :totalProducts
      },
    };
  } else if (result.status == 404) {
    
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }
  
}
