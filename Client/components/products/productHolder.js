import ProductSkeleton from './productSkeleton';
import LeftProductHolder from "./leftHolder";
export default  function ProductHolder(){
    return (
        <>
        <div className="productHolder bg-white dark:bg-[#252525]">
            <ProductSkeleton/>
            <LeftProductHolder />
            <ProductSkeleton/>
        </div>
        </>
    )
}