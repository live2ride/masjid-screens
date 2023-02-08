export const MOCK: ScreensData = {
  title: "Islamic Center of Daytona Beach",
  logo: "https://d.masjidplus.com/public/image/thumbnail/007488EE-860E-EB11-96B2-000C296F23D0.webp",
  defaultLogo: "https://masjidplus.com/public/default/default.png",
  url: "https://masjidplus.com",
  prayerTimes: [
    {
      start_date: "2023-01-01",
      end_date: "2025-01-01",
      iqamah: {
        fajr: "06:00",
        dhuhr: "13:30",
        asr: "17:30",
        isha: "21:00",
      },
    },
    {
      start_date: null,
      end_date: null,
      jumuah: [
        { adhan: "12:10", iqamah: "12:40" },
        { adhan: "13:30", iqamah: "14:00" },
        { adhan: "14:30", iqamah: "15:00" },
      ],
    },
  ],
  events: [
    {
      title: "MCMC & An Noor Kids Soccer",
      url: "/event/mcmc-muslim-center-of-middlesex-county/mcmc-and-an-noor-kids-soccer",
      dt: "2023-02-08T18:30:00.000Z",
    },
    {
      title: "GIRLS' HADITH CLUB",
      url: "/event/mcmc-muslim-center-of-middlesex-county/girls-hadith-club",
      dt: "2023-02-09T18:30:00.000Z",
    },
    {
      title: "BOYS' HADITH CLUB",
      url: "/event/mcmc-muslim-center-of-middlesex-county/boys-hadith-club",
      dt: "2023-02-09T18:30:00.000Z",
    },
    {
      title: "The Prophetic Path ﷺ",
      url: "/event/mcmc-muslim-center-of-middlesex-county/the-prophetic-path",
      dt: "2023-02-09T20:00:00.000Z",
    },
    {
      title: "GIRLS ON THE MOVE",
      url: "/event/mcmc-muslim-center-of-middlesex-county/girls-on-the-move",
      dt: "2023-02-11T14:30:00.000Z",
    },
  ],
  messages: ["First sliding msg", "second sliding msg", "third sliding msg"],
};

export type ScreensData = {
  title?: string;
  logo?: string;
  defaultLogo?: string;
  url: string;
  events?: ScreenEvent[];
  prayerTimes?: ScreenPrayerTimes[];
  messages?: string[];
};

export type ThemeProps = {
  background: string;
  primary: string;
  secondary: string;
  fontSize: number;
};

// type PrayerTimes =
export type ScreenEvent = {
  title: string;
  /** date time: 2023-02-07 15:30 */
  dt: string;
  url: string;
  src?: string;
};

export type ScreenPrayerTimes =
  | {
      //all times must be in HH:mm format ex: 21:45, you can then convert from this format to any other format
      start_date: string;
      end_date: string;
      iqamah: {
        fajr: string;
        dhuhr: string;
        asr: string;
        isha: string;
      };
    }
  | {
      start_date: null;
      end_date: null;
      jumuah: {
        adhan: string; //"13:45"
        iqamah: string; //"13:45"
      }[];
    };
