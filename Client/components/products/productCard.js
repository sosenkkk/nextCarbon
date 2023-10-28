import Link from "next/link";

export default function ProductCard(props) {
  const cartButtonHandler = () => {
    props.onAddCart(props.id);
  };
  function numberWithCommas(x) {
    return x.toLocaleString("en-IN");
  }
  return (
    <>
      <div className="w-full bg-white transition-colors rounded-lg shadow-xl   dark:bg-[#171717] productContainer  ">
        <Link href={`/products/${props.id}`}>
          <img
            className=" p-2  rounded-lg productImage"
            src={props.image}
            alt="product image"
          />
        </Link>
        <div className="px-5 productName">
          <div className="flex justify-between items-center">
            <Link href={`/products/${props.id}`}>
              <h5 className="text-2xl hover:underline font-semibold tracking-tight text-gray-800 dark:text-gray-200">
                {props.name}
              </h5>
            </Link>
            <h6 className=" text-gray-500 dark:text-gray-400">{props.model}</h6>
          </div>
          <h6 className="text-sm text-gray-500 dark:text-gray-400">
            Model Number- {props.modelNo}
          </h6>

          <div className="flex items-center justify-between sm:flex-col productprice">
            <span className="text-3xl font-bold  text-gray-800 dark:text-gray-200">
            ₹{numberWithCommas(props.price)}
            </span>
            
          </div>
          {
            !props.isAdmin && 
            <button onClick={cartButtonHandler} className="cartBtn cartBtnWidth">
            <span className="cartIconContainer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 576 512"
                fill="rgb(240,240,240)"
                className="cart"
              >
                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
              </svg>
            </span>
            <p className="text">Add to Cart</p>
          </button>
          }
          {
            props.isAdmin && 
            <Link className="cartBtn" style={{width:"100%", backgroundColor:"#176B87"}} href={`view-products/${props.id}`}>Edit Product</Link>
          }
        </div>
      </div>
    </>
  );
}
