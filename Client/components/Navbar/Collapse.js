import React from "react";
import {Select, SelectItem} from "@nextui-org/react";


export default function SelectH() {
  const sizes = ["sm", "md", "lg"];
  const animals = ["a", "b", "c"]
  return (
    <div className="w-full flex flex-col gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Select 
            size={size}
            label="Select an animal" 
            className="max-w-xs" 
          >
            {animals.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal}
              </SelectItem>
            ))}
          </Select>
          
        </div>
      ))}  
    </div>  
  );
}
