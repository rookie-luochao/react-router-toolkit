import reduce from "lodash-es/reduce";
import { Dictionary, ParsedUrlQueryValue } from "./type";

// 将queryMap数据转换成queryString
export function toQueryString(queryObj: Dictionary<ParsedUrlQueryValue>) {
  if (!queryObj) return "";

  const keyValueString = reduce(
    queryObj,
    (pre, value, key) => {
      let keyValueString = "";

      if (Array.isArray(value)) {
        keyValueString = reduce(
          value,
          (cPre, item) => {
            return cPre ? `${cPre}&${key}=${item}` : `${key}=${item}`;
          },
          "",
        );
      } else {
        keyValueString = `${key}=${value}`;
      }

      return pre ? `${pre}&${keyValueString}` : keyValueString;
    },
    "",
  );

  return `?${keyValueString}`;
}