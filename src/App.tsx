import Container from "@mui/material/Container";
import MotionLazyContainer from "src/screens/motion/MotionLazyContainer";
import ScreensPage from "src/screens/ScreensPage";

export default function App() {
  return (
    <MotionLazyContainer>
      <Container maxWidth={false} sx={{ p: 0, pt: 5 }}>
        <ScreensPage />
      </Container>
    </MotionLazyContainer>
  );
}
