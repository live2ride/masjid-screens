import { lazy } from "react";

const Title = lazy(() => import("./Title"));
const TitleWithLogo = lazy(() => import("./TitleWithLogo"));
const SubFooter = lazy(() => import("./SubFooter"));
const PrayerTimesDefault = lazy(() => import("./PrayerTimesDefault"));

export { Title, TitleWithLogo, SubFooter, PrayerTimesDefault };
