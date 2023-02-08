import Typography from "@mui/material/Typography";
import { useScreensContext } from "src/screens/ScreensContext";

const Title = () => {
  const { title } = useScreensContext();
  return (
    <Typography variant="h3" component={"h1"} textAlign="center">
      {title}
    </Typography>
  );
};

export default Title;
