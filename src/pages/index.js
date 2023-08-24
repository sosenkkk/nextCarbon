import FrontPart from "../../components/Layout/front";
import Carosel from "./../../components/Layout/carosel";
import CardHolder from "../../components/cards/cardHolder";
export default function Home() {
  return (
    <>
      <FrontPart />
      <div >
      <Carosel className="holder" />
      <CardHolder />
      </div>
      
    </>
  );
}
