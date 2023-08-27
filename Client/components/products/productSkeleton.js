import Link from "next/link";

import Section from "../cards/Section";

export default function ProductSkeleton(props) {
  return (
    <>
      <div className={`skeletonHolder`}>
        <div className="flex self-start  flex-col items-center bg-gray-50 border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-[#252525] dark:hover:bg-gray-800 productSkeleton">
          <Link href="/">
            <img
              className="object-cover w-full rounded-t-lg   md:rounded-none md:rounded-l-lg"
              src="/img/1.jpg"
              alt=""
            />
          </Link>

          <div className="flex flex-col  justify-between justify-self-end p-4 leading-normal">
            <Section>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-gray-100  productHeader">
                Noteworthy technology acquisitions 2021
              </h5>
            </Section>
            <Section>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-300">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
}
