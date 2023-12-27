import { startsWith } from "lodash-es";
import { Dictionary, ParseQueryString, ParsedUrlQueryValue } from "./type";

export function parseQueryString<Str extends string>(queryString: Str): ParseQueryString<Str>;
export function parseQueryString(queryString: string) {
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
        (queryObj[key] as Array<string>).push(value);
      } else {
        queryObj[key] = [queryObj[key] as string, value];
      }
    } else {
      queryObj[key] = value;
    }
  });

  return queryObj;
}