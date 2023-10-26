import Link from "next/link";

export default function AccountCard(props) {
  return (
    <>
      <div className="text-white bg-teal-600 shadow-md transition-colors hover:shadow-lg transition-all accountButtons ">
        {props.link != null && (
          <Link href={props.link}>
            <h2 className="text-lg hover:underline">{props.title}</h2>
          </Link>
        )}
        {props.link == null && (
          <div onClick={props.onClick}>
            <h2 className="text-lg hover:underline">{props.title}</h2>
          </div>
        )}

        <p>{props.description}</p>
      </div>
    </>
  );
}
