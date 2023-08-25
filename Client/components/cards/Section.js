import styles from "./../Layout/styles.module.css";
import { useRef } from "react";
import { useInView } from "framer-motion";


export default function Section({ children }) {
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