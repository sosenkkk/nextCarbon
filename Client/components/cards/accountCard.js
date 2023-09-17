import Link from "next/link";

export default function AccountCard(props) {
  return (
    <>
      <div className="text-white bg-teal-600 shadow-md  hover:shadow-lg transition-all accountButtons ">
              <Link href={props.link}>
                <h2 className="text-lg hover:underline">{props.title}</h2>
              </Link>
              <p>{props.description}</p>
            </div>
    </>
  );
}
