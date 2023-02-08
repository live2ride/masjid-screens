import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { MOCK } from "../types";
import { useScreensContext } from "src/screens/ScreensContext";
import { useEffect } from "react";
import { filter, map } from "lodash";
const settings = {};

const getJumuah = (data: any) => {
  const j = data ? filter(data, "jumuah") : [];
  if (j?.[0]?.jumuah) {
    return j[0].jumuah;
  }

  return [];
};
const getIqamah = (data: any) => {
  let obj = {
    fajr: "",
    dhuhr: "",
    asr: "",
    isha: "",
  };
  const iqamahs = data ? filter(data, "iqamah") : [];
  const iqamah = iqamahs.length > 0 ? iqamahs[0]?.iqamah : undefined; //find next one??
  if (iqamah) {
    obj = iqamah;
  }

  return obj;
};
export default function PrayerTimesDefault() {
  const { prayerTimes: data, updateScreensData } = useScreensContext();
  // useEffect(() => {
  //   setTimeout(() => {
  //     updateScreensData({ title: "hello world" });
  //   }, 3000);
  // }, []);
  const iq = getIqamah(data);
  const j = getJumuah(data);

  // const theme = useTheme();
  // console.log("theme", theme);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          gridAutoRows: "1fr",
          gridAutoColumns: "1fr",
          height: "100%",
        }}
      >
        <DemoBox name="fajr" adhan="06:12" iqamah={iq.fajr} />
        <DemoBox name="dhuhr" adhan="12:10" iqamah={iq.dhuhr} />
        <DemoBox name="asr" adhan="15:10" iqamah={iq.asr} />
        <DemoBox name="mahgrib" adhan="17:34" />
        <DemoBox name="isha" adhan="19:23" iqamah={iq.isha} />
        <JumuahBox data={j} />
      </Box>
    </>
  );
}
const BOXSX = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: 1,
  width: 1,
  p: 1,
  color: "primary.main",
  textAlign: "center",
  bgcolor: "divider",
};
const JumuahTableCell = ({ children }: any) => {
  return (
    <TableCell size="small" align="center">
      {children}
    </TableCell>
  );
};
type JumuahType = {
  adhan: string; //"13:45"
  iqamah: string; //"13:45"
};
function JumuahBox({ data }: { data: JumuahType[] }) {
  return (
    <Stack
      sx={{
        borderRadius: (theme) => theme.shape.borderRadius,
        ...BOXSX,
      }}
      spacing={1}
    >
      <Typography
        variant="h5"
        component={"h5"}
        sx={{ textTransform: "uppercase", fontWeight: "bold" }}
      >
        {"JUMUAH"}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <JumuahTableCell>Adhan</JumuahTableCell>
            <JumuahTableCell>Iqamah</JumuahTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {map(data, (j, i) => (
            <TableRow key={i}>
              <JumuahTableCell>
                <Typography sx={{ color: "primary.main" }} variant="h5">
                  {j.adhan}
                </Typography>
              </JumuahTableCell>
              <JumuahTableCell align="center">
                <Typography sx={{ color: "primary.main" }} variant="h5">
                  {j.iqamah}
                </Typography>
              </JumuahTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
}

function DemoBox({ sx, name, adhan, iqamah, isNext }: any) {
  return (
    <Stack
      sx={{
        ...BOXSX,
        borderRadius: (theme) => theme.shape.borderRadius,
        ...(isNext && {
          bgcolor: "primary.main",
          color: (theme) =>
            theme.palette.getContrastText(theme.palette.primary.main),
        }),
      }}
      spacing={1}
    >
      <Typography
        variant="h5"
        component={"h5"}
        sx={{ textTransform: "uppercase", fontWeight: "bold" }}
      >
        {name}
      </Typography>

      <Typography
        variant="h3"
        sx={{
          p: 1,
          fontWeight: "bold",

          width: 1,
        }}
      >
        {adhan}
      </Typography>
      <Typography variant="h4" sx={{ p: 1, fontWeight: "bold" }}>
        {iqamah || adhan}
      </Typography>
    </Stack>
  );
}
