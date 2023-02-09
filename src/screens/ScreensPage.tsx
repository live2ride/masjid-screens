import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "src/core/components/icon";
import ScreensMenu from "src/screens/components/ScreensMenu";
import ScreenComponent, { ComponentType } from "src/screens/ScreenComponent";
import { ScreensProvider } from "src/screens/ScreensContext";

const OPTIONS = [
  "sidebar",
  "header",
  "main",
  "main2",
  "main3",
  "footer",
  "subfooter",
] as const;
type OptionsType = typeof OPTIONS[number];

type StateProps = {
  options: {
    [key in OptionsType]: boolean;
  };
  components: {
    [key in OptionsType]?: any;
  };
};

const defaultState: StateProps = {
  options: {
    sidebar: false,
    header: true,
    main: true,
    main2: true,
    main3: true,
    footer: true,
    subfooter: true,
  },
  components: {
    sidebar: "TitleWithLogo",
    header: "Title",
    main: "TitleWithLogo",
    main2: "Title",
    main3: "TitleWithLogo",
    footer: "PrayerTimesDefault",
    subfooter: "SubFooter",
  },
};

const SX = {
  hover: { "&:hover": { bgcolor: "grey.300" }, position: "relative" },
  center: {
    textAlign: "center",
  },
  main: {
    gridArea: "main",
    width: "100%",
    "&:hover": { bgcolor: "grey.300" },
  },
};

export default function ScreensPage() {
  const fullScreenRef = useRef(false);
  const [state, setState] = useState(defaultState);
  const [fullscreen, setFullscreen] = useState(false);
  fullScreenRef.current = fullscreen;

  const handleFullScreenChange = () => {
    if (document.fullscreenElement) {
      if (!fullScreenRef.current) {
        setFullscreen(true);
      }
    } else {
      if (fullScreenRef.current) {
        setFullscreen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener(
      "fullscreenchange",
      handleFullScreenChange,
      false
    );
    // document.addEventListener("keyup", handleKeyUp)

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullScreenChange,
        false
      );
      //   document.removeEventListener("keyup", handleKeyUp)
    };
  }, []);
  const onToggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };
  const onToggle = (name: keyof typeof defaultState.options) => {
    const o = { ...state.options };
    o[name] = !o[name];
    setState({ ...state, options: o });
  };
  const { sidebar, header, footer, subfooter, main2, main3 } = state.options;
  const c = state.components;
  const componentChange = (name: OptionsType, comp: ComponentType) => {
    const c = { ...state.components };
    c[name] = comp;
    console.log("c", c);
    setState({ ...state, components: c });
  };

  return (
    <ScreensProvider>
      {!fullscreen && (
        <IconButton
          icon="expand"
          size="xl"
          sx={{
            zIndex: 9,
            bgcolor: "primary.main",
            bottom: 20,
            left: 20,
            position: "fixed",
          }}
          onClick={onToggleFullScreen}
        />
      )}
      {!fullscreen && (
        <ScreenLayout options={state.options} onToggle={onToggle} />
      )}
      <Box sx={{ mt: 5 }} />
      <Box
        sx={{
          display: "grid",
          height: "90vh",
          gridAutoColumns: "3fr",
          minHeight: "800px",
        }}
      >
        <Box sx={{ gridRow: "1", gridColumn: "span 2" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              gap: 1,
            }}
          >
            {header && (
              <Box
                sx={{
                  height: "20%",
                  ...SX.hover,
                  position: "relative",
                }}
              >
                <ContainerOptions
                  fullscreen={fullscreen}
                  name="header"
                  componentChange={componentChange}
                />
                {c?.header && <ScreenComponent name={c.header} />}
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                gap: 1,
                gridAutoRows: "1fr",
                gridAutoColumns: "1fr",
                height: "100%",
              }}
            >
              <Box sx={{ ...SX.main, ...SX.hover }}>
                <ContainerOptions
                  fullscreen={fullscreen}
                  name="main"
                  componentChange={componentChange}
                />
                {c?.main && <ScreenComponent name={c.main} />}
              </Box>
              {main2 && (
                <Box sx={{ ...SX.main, ...SX.hover }}>
                  <ContainerOptions
                    fullscreen={fullscreen}
                    name="main2"
                    componentChange={componentChange}
                  />
                  {c?.main2 && <ScreenComponent name={c.main2} />}
                </Box>
              )}
              {main3 && (
                <Box sx={{ ...SX.main, ...SX.hover }}>
                  <ContainerOptions
                    fullscreen={fullscreen}
                    name="main3"
                    componentChange={componentChange}
                  />
                  {c?.main3 && <ScreenComponent name={c.main3} />}
                </Box>
              )}
            </Box>

            {footer && (
              <Box sx={{ height: "20%", ...SX.hover }}>
                <ContainerOptions
                  fullscreen={fullscreen}
                  name="footer"
                  componentChange={componentChange}
                />
                {c?.footer && <ScreenComponent name={c.footer} />}
              </Box>
            )}
            {subfooter && (
              <Box sx={{ height: "10%", ...SX.hover }}>
                <ContainerOptions
                  fullscreen={fullscreen}
                  name="subfooter"
                  componentChange={componentChange}
                />
                {c?.subfooter && <ScreenComponent name={c.subfooter} />}
              </Box>
            )}
          </Box>
        </Box>
        {sidebar && (
          <Box
            sx={{
              gridRow: "1",
              // gridColumn: "span ",
              minWidth: "100px",
              width: "100%",
              ...SX.hover,
            }}
          >
            <ContainerOptions
              fullscreen={fullscreen}
              componentChange={componentChange}
              name="sidebar"
            />
            {c?.sidebar && <ScreenComponent name={c.sidebar} />}
          </Box>
        )}
      </Box>
    </ScreensProvider>
  );
}

type ContainerOptionsProps = {
  fullscreen?: boolean;
  name: OptionsType;
  componentChange: (name: OptionsType, comp: ComponentType) => void;
};
function ContainerOptions({
  fullscreen,
  name,
  componentChange,
}: ContainerOptionsProps) {
  if (fullscreen) return null;

  return (
    <ScreensMenu
      onChange={(key) => {
        componentChange(name, key);
      }}
    />
  );
  // return (
  //   <IconButton icon="menu" sx={{ position: "absolute", top: 0, right: 0 }} />
  // );
}
const layoutSX = (selected: boolean) => {
  return {
    bgcolor: selected ? "primary.light" : "grey.200",
    borderRadius: "5px",
    p: 1,
  };
};
function ScreenLayoutText({ children }: { children: any }) {
  return (
    <Typography
      variant="caption"
      sx={{
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Typography>
  );
}
function ScreenLayout({ options, onToggle }: any) {
  const { sidebar, header, footer, subfooter, main2, main3 } = options;
  return (
    <>
      <Box
        sx={{
          display: "grid",
          height: "200px",
          width: "300px",
          gap: 1,
        }}
      >
        <Box sx={{ gridRow: "1", gridColumn: "span 2" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              gap: 1,
            }}
          >
            <Box
              sx={{
                ...layoutSX(header),
                height: "20%",
              }}
              onClick={() => onToggle("header")}
            >
              <ScreenLayoutText>Header</ScreenLayoutText>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                gridAutoRows: "1fr",
                gridAutoColumns: "1fr",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  ...SX.main,
                  ...layoutSX(true),
                }}
              >
                <ScreenLayoutText>Main 1</ScreenLayoutText>
              </Box>
              <Box
                sx={{
                  ...SX.main,
                  ...layoutSX(main2),
                }}
                onClick={() => onToggle("main2")}
              >
                <ScreenLayoutText>Main 2</ScreenLayoutText>
              </Box>
              <Box
                sx={{
                  ...SX.main,
                  ...layoutSX(main3),
                }}
                onClick={() => onToggle("main3")}
              >
                <ScreenLayoutText>Main 3</ScreenLayoutText>
              </Box>
            </Box>

            <Box
              sx={{
                ...layoutSX(footer),
                height: "20%",
              }}
              onClick={() => onToggle("footer")}
            >
              <ScreenLayoutText>Footer</ScreenLayoutText>
            </Box>
            <Box
              sx={{
                ...layoutSX(subfooter),
                height: "15%",
              }}
              onClick={() => onToggle("subfooter")}
            >
              <ScreenLayoutText>Sub Footer</ScreenLayoutText>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            gridRow: "1",
            ...layoutSX(sidebar),
          }}
          onClick={() => onToggle("sidebar")}
        >
          <ScreenLayoutText>Sibebar</ScreenLayoutText>
        </Box>
      </Box>
    </>
  );
}
