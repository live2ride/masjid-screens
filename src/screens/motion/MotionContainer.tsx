import { m } from "framer-motion";
// @mui
import { Box, BoxProps } from "@mui/material";
//

// ----------------------------------------------------------------------

type Props = BoxProps;

const varContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};
export default function MotionContainer({ children }: Props) {
  return (
    <Box
      component={m.div}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={varContainer}
    >
      {children}
    </Box>
  );
}
