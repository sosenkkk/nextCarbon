import ProductSkeleton from "./productSkeleton";
import LeftProductHolder from "./leftHolder";
export default function ProductHolder() {
  return (
    <>
      <div className="productHolder bg-[#f7f7f7] dark:bg-[#171717]">
        <ProductSkeleton />
        <LeftProductHolder />
        <ProductSkeleton />
      </div>
    </>
  );
}
