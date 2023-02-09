import { Avatar, Box, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import QRCode from "react-qr-code";
import { useScreensContext } from "src/screens/ScreensContext";

const TitleWithLogo = () => {
  const { title, logo, url } = useScreensContext();
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        height: 1,
      }}
    >
      <Avatar
        variant="rounded"
        sx={{ width: "70%", height: "auto", maxWith: "200px" }}
        src={logo}
      />

      <Typography
        variant="h4"
        component={"h1"}
        textAlign="center"
        sx={{ color: "primary.main", my: 3 }}
      >
        {title}
      </Typography>
      <Box>
        <QRCode
          size={120}
          value={url}
          // style={{ width: "3em", height: "3em" }}
        />
        <Box sx={{ textAlign: "center" }}>{"visit us"}</Box>
      </Box>
    </Stack>
  );
};
export default TitleWithLogo;
