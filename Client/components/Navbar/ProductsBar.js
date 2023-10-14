import { Select, SelectItem } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";


export default function ProductBar(props) {
  const router = useRouter();
  const productModels = useSelector((state)=>state.product.productModels)
  const categoryHandler = (event) => {
    props.onChangeProducts(event.target.value)
  };
  const sortingHandler=(event)=>{
    props.onsortProducts(event.target.value)
  }
  const productsCategory = productModels;
  const sortCategory = [{label:"Low to High", value:1}, {label:"High to Low", value:-1}];
  return (
    <div className="w-100 dark:text-white flex gap-4 justify-end items-center p-2 flex-col sm:flex-row">
      <Select
        size="sm"
        label="Category"
        placeholder="Filter Category"
        className="max-w-xs "
        onChange={categoryHandler}
      >
        {productsCategory.map((category) => (
          <SelectItem
            className="max-w-xs dark:text-white"
            key={category}
            value={category}
          >
            {category}
          </SelectItem>
        ))}
      </Select>
      <Select onChange={sortingHandler} size="sm" label="Sort" className="max-w-xs ">
      {sortCategory.map((category) => (
          <SelectItem
            className="max-w-xs dark:text-white"
            key={category.value}
            value={category.value}
          >
            {category.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
