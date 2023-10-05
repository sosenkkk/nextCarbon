import Link from "next/link";

export default function Card(props) {
  return (
    <>
      <div className="max-w-sm bg-[#fff]  rounded-lg shadow-xl dark:bg-[#252525] cardComponent">
        <Link href="#">
          <img className="rounded-t-lg" src="/img/white.jpg" alt="" />
        </Link>
        <div className="p-5">
          <Link href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-teal-700 dark:text-teal-500">
              {props.title}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-300">
            {props.children}
          </p>
          {/* <Link
            href="#"
            className="inline-flex items-center px-3 text-sm font-medium text-center  hoverButton"
          >
            <span className="dark:text-gray-200">Read more</span>
            <svg viewBox="0 0 13 10" height="10px" width="15px" >
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </Link> */}
        </div>
      </div>
    </>
  );
}
