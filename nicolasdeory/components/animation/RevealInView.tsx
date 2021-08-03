import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { IntersectionObserverProps, InView } from "react-intersection-observer";

interface RevealInViewProps {
  disabled?: boolean;
  children: JSX.Element | JSX.Element[]
  style: any;
}

const motionDivVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    transition: { duration: 0.2 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2 },
  },
};

export default function RevealInView({ children, disabled, style}: RevealInViewProps) {
  const controls = useAnimation();
  const [inView, setInview] = useState(false);
  
  async function onInViewChanged(visible) {
    if (!disabled && visible && !inView) {
      await controls.start("visible");
      setInview(true);
    }
  }

  return (
    <InView onChange={onInViewChanged} style={style} >
      <motion.div variants={motionDivVariants} initial={disabled ? "visible" : "hidden"} animate={controls}>
        {children}
      </motion.div>
    </InView>
  );
}
