import { m, MotionProps } from "framer-motion";
// @mui
import { Box, BoxProps } from "@mui/material";
//
import MotionContainer from "./MotionContainer";

// ----------------------------------------------------------------------

type Props = BoxProps & MotionProps;

interface TextAnimateProps extends Props {
  text: string;
}

const variant = {
  initial: {
    x: 960,
  },
  animate: {
    x: 0,
    transition: {
      duration: 0.64,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  exit: {
    x: 160,
    transition: {
      duration: 0.48,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

export default function TextAnimate({
  text,
  variants,
  sx,
  ...other
}: TextAnimateProps) {
  return (
    <MotionContainer>
      <Box
        component={m.div}
        sx={{
          m: 0,
          typography: "h1",
          overflow: "hidden",
          display: "inline-flex",
          ...sx,
        }}
        {...other}
      >
        {text.split("").map((letter, index) => (
          <m.span key={index} variants={variant}>
            {letter === " " ? <span>&nbsp;</span> : letter}
          </m.span>
        ))}
      </Box>
    </MotionContainer>
  );
}
