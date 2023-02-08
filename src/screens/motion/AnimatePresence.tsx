import { AnimatePresence as FramerAnimatePresence, m } from "framer-motion";

export const AnimatePresence = ({ children }: any) => {
  return <FramerAnimatePresence mode="wait">{children}</FramerAnimatePresence>;
};

export const AnimateItem = ({ children }: any) => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </m.div>
  );
};
