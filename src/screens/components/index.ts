import { lazy } from "react";

const Title = lazy(() => import("./Title"));
const TitleWithLogo = lazy(() => import("./TitleWithLogo"));
const SlidingFooter = lazy(() => import("./SlidingFooter"));
const PrayerTimesDefault = lazy(() => import("./PrayerTimesDefault"));

export { Title, TitleWithLogo, SlidingFooter, PrayerTimesDefault };
