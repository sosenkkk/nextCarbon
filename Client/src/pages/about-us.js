import Section from "../../components/cards/Section";
import Footer from "./../../components/footer/footer";

export default function AboutUs() {
  return (
    <>
      <div className="pt-24 md:pt-20 bg-[#f7f7f7] dark:bg-[#171717]">
        <div className="w-full">
          <div className="aboutUsTitle">
            <h1 className=" text-teal-700">Carbon</h1>
          </div>
          <img
            alt="aboutUsImage"
            src="/img/Aboutus.jpeg"
            className="imageObject mx-auto"
          />
        </div>
        <div className="text-gray-700 dark:text-gray-200">
          <div className="p-8 sm:p-24 flex flex-col gap-4 bg-[#ebebeb] dark:bg-[#202020] ">
            <Section>
              <div className=" md:flex bg-[#f7f7f7] dark:bg-[#171717] shawdow-md rounded-lg mb-12">
                <div className="imageAbout">
                  <img src="/img/1.jpg" />
                </div>
                <div className="p-8">
                  <h1 className="text-3xl font-bold text-teal-700 dark:text-teal-500 underline">
                    About Carbon
                  </h1>
                  <p className="introduction text-gray-700 dark:text-gray-300 font-normal md:text-lg">
                    At Carbon, we're passionate about reimagining everyday
                    spaces. We understand the significance of bathrooms in your
                    daily life, and we're committed to enhancing your
                    experience.
                    <br />
                    Our brand is built on three pillars: Innovation, Elegance,
                    and Quality.
                    <br />
                    At Carbon, we believe that your bathroom should be a haven
                    of luxury and functionality.
                  </p>
                </div>
              </div>
            </Section>

            <Section>
              <div className=" md:flex bg-[#f7f7f7] dark:bg-[#171717] shawdow-md rounded-lg ">
                <div className="p-8 ">
                  <h2 className="text-3xl font-bold text-teal-700 dark:text-teal-500 underline">
                    Our Story
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 md:text-lg">
                    Carbon was born out of a passion for transforming everyday
                    spaces into extraordinary experiences. <br />
                    Our mission is simple: to create bathroom solutions that
                    elevate your daily rituals.
                    <br />
                    From faucets that conserve water to sleek, eco-friendly
                    toilets, Carbon is dedicated to sustainability without
                    compromising on style.
                  </p>
                </div>
                <div className="imageAbout">
                  <img src="/img/1.jpg" />
                </div>
              </div>
            </Section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
