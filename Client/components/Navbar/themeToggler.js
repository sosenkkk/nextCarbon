import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const ThemeButton = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [backImage, setbackImage]= useState(theme)

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  const currentTheme = theme === "system" ? systemTheme : theme;
  
  
  const themeHandler = () => {
    if (theme === "dark") {
      setTheme("light");
      setbackImage("light")
    } else if(theme==="light") {
      setTheme("dark");
      setbackImage('dark')

    }
  };
  console.log(backImage)
  return (
    <div  >
      {currentTheme === "dark" ? (
  <button
    className=" text-gray-100  rounded-md buttonTog"
    onClick={() => setTheme("light")}
    style={{padding:"6px "}}
  >
    <BsMoonFill fontSize={16} />
  </button>
) : (
  <button
    className=" rounded-md text-gray-900 buttonTog"
    onClick={() => setTheme("dark")}
    style={{padding:"6px "}}
  >
    <BsSunFill fontSize={16} />
  </button>
)}
    </div>
  );
};

export default ThemeButton;


