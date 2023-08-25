import Link from "next/link";
import Section from "../cards/Section";

export default function LeftProductHolder() {
  
  return (
    <div className="skeletonHolder " style={{ alignSelf: "flex-end" }}>
      <div class="flex  flex-col items-center bg-gray-50 border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-[#252525] dark:hover:bg-gray-800  productSkeleton">
        <div class="flex flex-col justify-between p-4 leading-normal hidden md:block">
        <Section>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-gray-100  productHeader">
              Noteworthy technology acquisitions 2021
            </h5>
          </Section>
          <Section>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-300">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </Section>
        </div>
        <Link href="/">
          <img
            class="object-cover w-full rounded-t-lg   md:rounded-none md:rounded-l-lg"
            src="/img/1.jpg"
            alt=""
          />
        </Link>
        <div class="flex flex-col justify-between p-4 leading-normal  block md:hidden">
          <Section>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-gray-100  productHeader">
              Noteworthy technology acquisitions 2021
            </h5>
          </Section>
          <Section>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-300">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
