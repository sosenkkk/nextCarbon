import React, { useState, useRef } from "react";

function ProductImage(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const profileRef = useRef();
  const changeProfileHandler = () => {
    profileRef.current.click();
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      props.onImageSelect(file);
    }
  };

  return (
    <div className="col-span-2">
      <label className="block mb-2 text-sm transition-colors font-medium text-gray-900 dark:text-white">
        Upload Image
      </label>
      <div className="productImageContainer">
        <input
          type="file"
          accept="image/*"
          className="dark:text-white text-black mb-2 w-full"
          ref={profileRef}
          onChange={handleImageChange}
        />
        {props.imageUploaded && (
          <img
            onClick={changeProfileHandler}
            src={selectedImage ? selectedImage : props.imgSrc}
            alt="default_pfp"
          />
        )}
        {
          props.imageSource && !selectedImage && (
            <img
            onClick={changeProfileHandler}
            src={selectedImage ? selectedImage : props.imageSource}
            alt="default_pfp"
          />
          )
        }
      </div>
    </div>
  );
}

export default ProductImage;
