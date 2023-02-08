import { SxProps } from "@mui/material";
import MuiCircularProgress from "@mui/material/CircularProgress";

type SpinnerProps = {
  children?: React.ReactNode;
  sx?: SxProps;
  isLoading: boolean;
};
export default function Spinner({ isLoading, ...rest }: SpinnerProps) {
  if (!isLoading) return null;

  return (
    <MuiCircularProgress
      size="1em"
      thickness={3.5}
      sx={{
        color: "inherit",
      }}
      {...rest}
    />
  );
}
