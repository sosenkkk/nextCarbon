import FrontPart from "../../components/Layout/front";
import Carosel from "./../../components/Layout/carosel";
import CardHolder from "../../components/cards/cardHolder";
import ProductHolder from "../../components/products/productHolder";
import Link from "next/link";
import Footer from './../../components/footer/footer';

export default function Home() {

  return (
    <>
      <FrontPart />
      <div>
        <Carosel className="holder " />
        <div className="bg-[#f7f7f7]  dark:bg-[#171717]">
          <hr className=" ruler__front" />
        </div>
        <ProductHolder />
        <div className="bg-[#f7f7f7] dark:bg-[#171717]">
          <hr id="secondRuler" className=" ruler__front" />
        </div>

        <CardHolder />
      </div>
        
        <Footer />
    </>
  );
}

