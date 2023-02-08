import queryStringParse from "query-string";
import { NavLink as RouterLink, createSearchParams } from "react-router-dom";
import MUILink from "@mui/material/Link";
import { useLocation } from "react-router";

import isPlainObject from "lodash/isPlainObject";

export function isExternalLink(path: string) {
  if (typeof path === "string") {
    return path.includes("http");
  } else {
    return false;
  }
}

export const linkProps = (href?: string) => {
  if (!href) return {};

  if (isExternalLink(href) || href.includes("tel")) {
    return {
      href: href,
      target: "_blank",
      rel: "noopener",
      component: MUILink,
    };
  } else {
    return {
      component: RouterLink,
      to: href || "#",
    };
  }
};
export const useParams = (keys: string[]) => {
  const l = useLocation();
  const arr = l.pathname.split("/");
  let o: any = {
    pathname: l.pathname,
  };
  keys.forEach((key, i) => {
    o[key] = arr[i + 1];
  });
  return o;
};
export const useQuery = (search?: string) => {
  const s = search || window.location.search;
  let rs = queryStringParse.parse(s);
  return rs || {};
};

export const query = (search?: string) => {
  const s = search || window.location.search;
  let rs = queryStringParse.parse(s);
  return rs || {};
};

export const navigateSearch = (
  history: any,
  params: any,
  includeOtherParams = false
) => {
  const search = includeOtherParams ? query() : {};
  let currentParams = { ...search, ...params };
  Object.keys(currentParams).forEach((key) => {
    if (currentParams[key] === undefined || currentParams[key] === "") {
      delete currentParams[key];
    }
  });

  return history({
    search: `?${createSearchParams(currentParams)}`,
  });
};

export const navigate = (history: any, url: string, target = "_blank") => {
  if (url && isPlainObject(url)) {
    if (history) {
      navigateSearch(history, url);
    }
  } else {
    if (!url.includes(":")) {
      if (history) {
        history(url);
      }
    } else {
      window.open(url, target, "noopener");
    }
  }
};
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  // return navigator.userAgentData.mobile;
};
