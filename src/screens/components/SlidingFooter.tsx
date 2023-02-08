import { Avatar, Box, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import AnimatedText from "src/screens/motion/AnimatedText";
import TextAnimate from "src/screens/motion/TextAnimate";

import { useScreensContext } from "src/screens/ScreensContext";
const AvatarSX = {
  alignSelf: "center",
  width: "70px",
  height: "70px",
};
const SubFooter = () => {
  const { logo, defaultLogo } = useScreensContext();
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        // justifyContent: "center",
        // alignItems: "center",
        maxHeight: "100%",
        overflow: "hidden",
      }}
      spacing={2}
    >
      <Avatar src={logo} sx={AvatarSX} />

      <Box
        sx={{
          typography: "h3",
          flex: 1,
          alignItems: "center",
          alignSelf: "center",
          textAlign: "center",
        }}
      >
        <SubFooterMessages />
      </Box>

      <Avatar src={defaultLogo} sx={AvatarSX} />
    </Stack>
  );
};
const container = {
  visible: {
    y: 0,
    transition: {
      staggerChildren: 0.025,
    },
  },
  exit: {
    y: "100%",
  },
};
const SubFooterMessages = () => {
  const { messages } = useScreensContext();
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    if (messages && Array.isArray(messages) && messages.length > 0) {
      setMsg(messages[0]);
    }
  }, [messages]);

  useEffect(() => {
    var t: NodeJS.Timer;
    if (messages && Array.isArray(messages) && messages.length > 1) {
      let index = messages.indexOf(msg) || 0;
      if (index >= messages.length - 1 || index < 0) {
        index = 0;
      } else {
        index = index + 1;
      }

      t = setTimeout(() => {
        setMsg(messages[index]);
      }, 7000);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [msg]);

  return (
    <AnimatePresence mode={"wait"}>
      <m.div
        key={msg}
        initial="hidden"
        animate={"visible"}
        exit={"exit"}
        transition={{ duration: 0.5 }}
        variants={container}
      >
        <AnimatedText key={msg} text={msg} />
      </m.div>
    </AnimatePresence>
  );
};

export default SubFooter;
