import Link from "next/link";

export default function Card(props) {
  return (
    <>
      <div className="max-w-sm bg-[#fff] transition-colors  rounded-lg shadow-xl dark:bg-[#252525] cardComponent">
        <Link href={{pathname:`${props.link}`, query:{filter:props.filter}}}>
          <img className="rounded-t-lg bottomCardImage" src={props.imgSrc} alt="" />
        </Link>
        <div className="p-5">
        <Link href={{pathname:`${props.link}`, query:{filter:props.filter}}}>
            <h5 className="mb-2 hover:underline text-2xl font-bold tracking-tight text-teal-700 dark:text-teal-500">
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
