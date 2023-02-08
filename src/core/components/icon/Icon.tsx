import React, { forwardRef } from "react";

import { Box, BoxProps } from "@mui/material";
import ICONS from "src/config/icons.json";
import type { IconType } from "src/model/request/iconTypes"

const IconSizeValues = ["xxs", "xs", "sm", "md", "lg", "xl", "2x", "thumbnail"] as const;
export type IconSize = typeof IconSizeValues[number];

export interface IconProps extends BoxProps {
  size?: IconSize;
  icon: IconType | string;
}

type PlainObject = { [key: string]: string[] };

const getPath = (icon: IconType | string) => {
  let name = icon;

  let src = "";
  Object.keys(ICONS).forEach((key: string) => {
    if ((ICONS as PlainObject)[key].includes(name)) {
      src = `/static/icons/${key}/${name}.svg`;
    }
  });
  return src;
};

const Icon = forwardRef<any, IconProps>(({ icon , size, sx, ...rest }, ref) => {


  let computedSize = ".9em";
  if (size) {
    computedSize = String(getSize(size));
  }
  
  const src = getPath(icon);
  if (icon && icon.includes("ic_"))
    return (
      <Box
        component="embed"
        src={src}
        ref={ref}
        sx={{
          width: computedSize,
          height: computedSize,
          stroke: "currentColor",
          fill: "currentColor",
          //   strokeWidth: "0",
          //   display: "inline-block",
          // mask: `url(${src}) no-repeat center / contain`,
          // WebkitMask: `url(${src}) no-repeat center / contain`,
          ...sx,
        }}
      />
    );

  return (
    <Box
      component="span"
      ref={ref}
      sx={{
        // typography: { xs:"h6", md: "h5" },
        width: computedSize,
        height: computedSize,
        stroke: "currentColor",
        // fill: "inherit",
        strokeWidth: "0",
        display: "inline-block",
        bgcolor: "currentColor",
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
    />
  );
});

export default Icon;

export const getSize = (size: IconSize) => {
  let width = .9;
  switch (size) {
  case "xxs":
    width = 0.5;
    break;
  case "xs":
    width = 0.7;
    break;
  case "sm":
    width = 0.8;
    break;
  case "lg":
    width = 1.2;
    break;
  case "xl":
    width = 1.3;
    break;
  case "2x":
    width = 1.5;
    break;
  case "thumbnail":
    width = 74;
    break;
  }
  if (width < 74) {
    return `${width}em`;
  } else {
    return width;
  }
};
