import ProductCard from "../../../components/products/productCard";


export default function Products(){
    return(
        <>
        <div className=" pt-28 transition-colors md:pt-24 bg-[#f7f7f7] dark:bg-[#202020] grid grid-cols-1 p-4 sm:px-8 md:grid-cols-2 gap-4 lg:grid-cols-3 justify-items-center gap-y-8 ">
            <ProductCard />        
            <ProductCard />        
            <ProductCard />        
            <ProductCard />        
            <ProductCard />        

        </div>
        </>
    )
}