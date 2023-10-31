import { Skeleton } from "@chakra-ui/react"

export default function ProductLoading(){
    return <>
    <div className="w-full bg-white transition-colors rounded-lg shadow-xl   dark:bg-[#171717] productContainer  ">
       <Skeleton >

          <img
            className="  rounded-lg productImage"
            alt="product image"
          />
        </Skeleton>

        <div className="px-5 productName">
          <div className="flex justify-between items-center">
            <div >
                <Skeleton>
              <h5 className="text-2xl hover:underline font-semibold tracking-tight text-gray-800 dark:text-gray-200">
                AAAAAAAAAA
              </h5>
              </Skeleton>
            </div>
            <Skeleton>
            <h6 className=" text-gray-500 dark:text-gray-400">AAAAAA</h6>
            </Skeleton>
          </div>
          <Skeleton>
          <h6 className="text-sm mt-2 text-gray-500 dark:text-gray-400">
            Model Number- AAAAAAAAAA
          </h6>
            </Skeleton>
          <div className="flex items-center justify-between sm:flex-col productprice">
          <Skeleton>
            <span >
            ₹ 11,999,999
            </span>
            </Skeleton>
          </div>
    <Skeleton>
          
            <button  >
            Add to cart
          </button>
          
      </Skeleton>
          
        </div>
      </div>
    </>
}