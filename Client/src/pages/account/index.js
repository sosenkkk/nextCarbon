import Link from "next/link";

export default function Account() {
  return (
    <>
      <div className="w-full  pt-20 p-4 md:p-24">
        <div className=" text-center sm:text-left">
          <h1 className="text-3xl ">Hello user!</h1>
          <Link className="md:text-xl hover:underline" href="/account/details">
            Manage your account
          </Link>
        </div>
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row  gap-4 flex-wrap w-full accountContainer">
            <div className=" bg-teal-200 shadow-md  hover:shadow-lg transition-all  accountButtons ">
              <Link href="/account/orders">
                <h2 className="text-lg hover:underline">Your Orders</h2>
              </Link>
              <p>Get info about your product</p>
            </div>
            <div className=" bg-teal-200 shadow-md  hover:shadow-lg transition-all  accountButtons ">
              <Link href="/account/orders">
                <h2 className="text-lg hover:underline">Security</h2>
              </Link>
              <p>New password!</p>
            </div>
            <div className=" bg-teal-200 shadow-md  hover:shadow-lg transition-all  accountButtons ">
              <Link href="/account/orders">
                <h2 className="text-lg hover:underline">Cart</h2>
              </Link>
              <p>Whats in your cart</p>
            </div>
            <div className=" bg-teal-200 shadow-md  hover:shadow-lg transition-all  accountButtons ">
              <Link href="/account/orders">
                <h2 className="text-lg hover:underline">Contact Us!</h2>
              </Link>
              <p>Order related or any query!</p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
