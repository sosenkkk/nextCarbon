import { BASE_URL } from "../../../../helper/helper";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Modal from "../../../../components/Modal";
import { useEffect, useState } from "react";
import ProductBar from "../../../../components/Navbar/ProductBar";
import ProductCard from "../../../../components/products/productCard";
import { Pagination } from "@nextui-org/react";
import { useSelector } from "react-redux";

export default function AdminProducts(props) {
  const [admin, setAdmin]= useState(false)
  const [products, setproducts] = useState([]);
    const [page, setpage] = useState(1);
    const [totalPage, settotalPage] = useState(1);
    const [filter, setfilter] = useState("");
    const [sort, setsort] = useState("");
    const router = useRouter();
    const toast = useToast();
    const [isModalOpen, setModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const token = useSelector((state)=>state.auth.userToken)
    const openModal = (id) => {
      setItemToDelete(id);
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setItemToDelete(null)
      setModalOpen(false);
    };

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
      setAdmin(true)
      setproducts(res.products);
      const pages = Math.ceil(res.totalProducts / 8);
      settotalPage(pages);
    } else if(result.status == 404){
      router.push("/404");

    }else {
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
  const deleteProductHandler = async () => {
    const id = itemToDelete;
    const result = await fetch(BASE_URL + "delete-product/"+id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
      const res = await result.json()
      if (result.status == 201) {
      toast({
        title: res.message,
        status: "error",
        isClosable: true,
      });
      router.reload()
      
    } else if (result.status == 433) {
      toast({
        title: res.message,
        status: "error",
        isClosable: true,
      });
      router.reload()
     
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
      {admin && <div className=" pt-28 transition-colors md:pt-20 bg-[#f9f9f9] dark:bg-[#202020]  p-4 sm:px-8 py-0">
        <ProductBar
          onChangeProducts={changeProductsHandler}
          onsortProducts={sortProductsHandler}
        />
        <div className="  gap-4   gap-y-8 productContainerHolder">
          {products.map((product) => (
            <ProductCard
              onAdminClick={openModal}
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
          <Modal isOpen={isModalOpen} onClose={closeModal} maxWidth="500px">
                <div className="px-8 rounded-lg py-4 bg-[#f7f7f7]  dark:bg-[#171717] text-gray-800 dark:text-gray-200">
                  <h2 className="text-lg text-center sm:text-xl font-semibold mb-4">
                    Click "Yes" to delete the Product.
                  </h2>
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:justify-around">
                    <button className="cartBtn" onClick={deleteProductHandler}>
                      Yes
                    </button>
                    <button
                      style={{ backgroundColor: "#F24C3D" }}
                      className="cartBtn"
                      onClick={closeModal}
                    >
                      No
                    </button>
                  </div>
                </div>
              </Modal>

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
      </div>}
    </>
  );
}

