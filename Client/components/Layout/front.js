import styles from "./styles.module.css";
import Section from "./../cards/Section"

export default function FrontPart() {
  return (
    <>
    <div className="w-full h-screen bg-light-theme dark:bg-dark-theme parallax" style={{position:"relative", zIndex:"-5"}} >
      <div className={styles.frontMain} >
        <Section><h1 className="dark:text-gray-300 text-gray-700">Carbon</h1></Section>
        <Section><p className="dark:text-gray-400 text-gray-600">Crafting Elegance, Inspiring Spaces</p></Section>
      </div>
      </div>
    </>
  );
}
