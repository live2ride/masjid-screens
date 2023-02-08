import Typography from "@mui/material/Typography";
import PrayerTimesDefault from "src/screens/components/PrayerTimesDefault";
import { SlidingFooter, Title, TitleWithLogo } from "./components";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
const NA = ({ header }: any) => {
  return (
    <Typography variant="h3" component={"h1"} textAlign="center" sx={{}}>
      {"This component is not available"}
    </Typography>
  );
};

function ErrorFallback() {
  return <Typography sx={{ color: "error.main" }}>Oooops... </Typography>;
}

export const COMPONENTS = {
  Title: Title,
  TitleWithLogo: TitleWithLogo,
  SlidingFooter: SlidingFooter,
  PrayerTimesDefault: PrayerTimesDefault,
};
export const ComponentsList = Object.keys(COMPONENTS);
export type ComponentType = keyof typeof COMPONENTS;

const ScreenComponent = ({ name }: { name: keyof typeof COMPONENTS }) => {
  const Component = COMPONENTS[name] || NA;
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ScreenComponent;
