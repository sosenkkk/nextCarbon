import { BsSunFill, BsMoonFill } from 'react-icons/bs';
import { useTheme } from "next-themes";
import { useState, useEffect } from 'react';

const ThemeButton =()=>{
    const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
   
      <div> 
        {currentTheme === "dark" ? (
          <button
            className="bg-[#252525] text-gray-300 hover:bg-black p-2 rounded-md "
            onClick={() => setTheme("light")}
          >
            <BsMoonFill fontSize={16} />
          </button>
        ) : (
          <button
            className="bg-white  rounded-md p-2 text-gray-700 hover:bg-gray-200"
            onClick={() => setTheme("dark")}
          >
           <BsSunFill fontSize={16} />
          </button>
        )}
      </div>
      
 
  );
}

export default ThemeButton;