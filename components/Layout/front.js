import styles from "./styles.module.css";
import { useRef } from "react";
import { useInView } from "framer-motion";


function Section({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className={styles.sectionMain }ref={ref}>
      <span
        style={{
          transform: isInView ? "none" : "translateY(100px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.35s"
        }}
      >
        {children}
      </span>
    </section>
  );
}


export default function FrontPart() {
  return (
    <>
    <div className="w-full h-screen bg-light-theme dark:bg-dark-theme parallax" style={{position:"relative", zIndex:"-5"}} >
      <div className={styles.frontMain} >
        <Section><h1>Carbon</h1></Section>
        <Section><p>Crafting Elegance, Inspiring Spaces</p></Section>
      </div>
      </div>
    </>
  );
}
