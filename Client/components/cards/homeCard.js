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
          
        </div>
      </div>
    </>
  );
}
