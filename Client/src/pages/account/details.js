import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import ProfilePicture from "../../../components/account/profilePicture";
import { BASE_URL } from "../../../helper/helper";
export default function Details() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [profileImage, setProfileImage]= useState(null);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const token = useSelector((state)=> state.auth.userToken)
  
  const imageSelect=(file)=>{
    if(file){
      setProfileImage(file)
    }
  }

  const changeDetailHandler=async(event)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append('firstName',firstNameRef.current.value);
    formData.append('lastName',lastNameRef.current.value);
    formData.append('image', profileImage)
    const response = await fetch(BASE_URL + "edit-info", {
      method: "POST",
      headers: {
        Authorization: "Bearer "+ token
      },
      body: formData,
    });
    const res = await response.json()
    console.log(res);
    
  }
  return (
    <>
     <div className="min-h-screen bg-[#fff] dark:bg-[#111111]">
            <div className="p-8 pt-28 md:pt-24  flex align-center justify-around w-full h-100">
        <form onSubmit={changeDetailHandler} action="#" className="bg-[#f7f7f7] dark:bg-[#171717] rounded-lg shadow-xl max-w-xl p-4 sm:p-12 md:p-16 w-full">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            {/* {!userInfo.profile && (
              <div className="col-span-2">
                <label className="block mb-2 text-sm text-center font-medium text-gray-900 dark:text-white">
                  Upload your Profile Photo
                </label>
                <div className="pfp_container">
                  <input type="file"  style={{ display: "none" }} ref={profileRef} />
                  <img
                    onClick={changeProfileHandler}
                    src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                    alt="default_pfp"
                  />
                </div>
              </div>
            )} */}
       <ProfilePicture imgSrc = {userInfo.profile}  onImageSelect={imageSelect}/>
            
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First name
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-700 block w-full p-2.5 dark:bg-[#262626] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white  dark:focus:border-teal-700"
                placeholder={userInfo.firstName}
                ref={ firstNameRef}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last name
              </label>
              <input
                type="text"
                id="last_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-700 block w-full p-2.5 dark:bg-[#262626] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white  dark:focus:border-teal-700"
                placeholder={userInfo.lastName}
                ref={ lastNameRef}
              />
            </div>

            {/* <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-700 block w-full p-2.5 dark:bg-[#262626] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white  dark:focus:border-teal-700"
                placeholder="XXXXXXXXXX"
                
              />
            </div> */}
          </div>
          <div className="mb-6 col-span-2 sm:col-span-1">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-700 block w-full p-2.5 dark:bg-[#262626] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white  dark:focus:border-teal-700"
              placeholder={userInfo.email}
              readOnly
              style={{ cursor: "not-allowed" }}
            />
          </div>
          {/* <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-700 block w-full p-2.5 dark:bg-[#262626] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white  dark:focus:border-teal-700"
              placeholder="•••••••••"
              
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-700 block w-full p-2.5 dark:bg-[#262626] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white  dark:focus:border-teal-700"
              placeholder="•••••••••"
              
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm_password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm new password
            </label>
            <input
              type="password"
              id="confirm_password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-700 block w-full p-2.5 dark:bg-[#262626] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white  dark:focus:border-teal-700"
              placeholder="•••••••••"
              
            />
          </div> */}

          <button
            type="submit"
            className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
          >
            Submit
          </button>
        </form>
      </div>
      </div>

    </>
  );
}
