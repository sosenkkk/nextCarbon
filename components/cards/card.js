import Link from "next/link";

export default function Card(props) {
  return (
    <>
      <div className="max-w-sm bg-white border border-teal-500 rounded-lg shadow dark:bg-black cardComponent">
        <Link href="#">
          <img className="rounded-t-lg" src="/img/white.jpg" alt="" />
        </Link>
        <div className="p-5">
          <Link href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
              Noteworthy technology acquisitions 2021
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-300">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <Link
            href="#"
            className="inline-flex items-center px-3 text-sm font-medium text-center  hoverButton"
          >
            <span className="dark:text-gray-200">Read more</span>
            <svg viewBox="0 0 13 10" height="10px" width="15px" >
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
