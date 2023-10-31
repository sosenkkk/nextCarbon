import ProductSkeleton from "./productSkeleton";
import LeftProductHolder from "./leftHolder";
export default function ProductHolder() {
  return (
    <>
      <div className="productHolder transition-colors bg-[#f7f7f7] dark:bg-[#171717]">
        <ProductSkeleton link="/products" imgSrc="/img/slide5.jpg" title="Explore Our Range" desc="Discover a range of toilets that combine comfort, innovation, and water efficiency to enhance your daily routine."/>
        <LeftProductHolder link="/products" imgSrc="/img/slide6.jpg" title="The Carbon Difference" desc="At Carbon, we don't just sell sanitaryware; we offer you the opportunity to transform your bathroom into a personal haven. "/>
        <ProductSkeleton link="/products" imgSrc="/img/slide4.jpg" title="Faucets and Taps" desc="Our faucets and taps are designed to bring the perfect balance of style and functionality to your bathroom space."/>
      </div>
    </>
  );
}
