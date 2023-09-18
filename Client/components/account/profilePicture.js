import React, { useState, useRef } from "react";

function ProfilePicture(props) {
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
      <label className="block mb-2 text-sm text-center font-medium text-gray-900 dark:text-white">
        Upload your Profile Photo
      </label>
      <div className="pfp_container">
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={profileRef}
          onChange={handleImageChange}
        />
        <img
          onClick={changeProfileHandler}
          src={selectedImage ? selectedImage : props.imgSrc}
          alt="default_pfp"
        />
      </div>
    </div>
  );
}

export default ProfilePicture;
