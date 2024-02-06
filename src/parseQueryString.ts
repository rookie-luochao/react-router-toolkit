import startsWith from "lodash-es/startsWith.js";
import { Dictionary, ParseQueryString, ParsedUrlQueryValue } from "./type";

export function parseQueryString<Str extends string>(queryString: Str, isNotDecode?: boolean): ParseQueryString<Str>;
export function parseQueryString(queryString: string, isNotDecode?: boolean) {
  if (!queryString || !queryString.trim()) {
    return {};
  }

  if (startsWith(queryString, "?")) {
    queryString = queryString.slice(1);
  }

  const queryObj: Dictionary<ParsedUrlQueryValue> = {};
  const items = queryString.split("&");

  items.forEach((item) => {
    const [key, value = ""] = item.split("=");

    if (queryObj[key]) {
      if (Array.isArray(queryObj[key])) {
        (queryObj[key] as Array<string>).push(isNotDecode ? value : decodeURIComponent(value));
      } else {
        queryObj[key] = [queryObj[key] as string, isNotDecode ? value : decodeURIComponent(value)];
      }
    } else {
      queryObj[key] = isNotDecode ? value : decodeURIComponent(value);
    }
  });

  return queryObj;
}