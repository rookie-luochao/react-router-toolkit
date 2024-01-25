import reduce from "lodash-es/reduce";
import { ParsedUrlQuery } from "./type";

// 将queryMap数据转换成queryString
export function toQueryString(queryObj: ParsedUrlQuery) {
  if (!queryObj) return "";

  const keyValueString = reduce(
    queryObj,
    (pre, value, key) => {
      let keyValueString = "";

      if (Array.isArray(value)) {
        keyValueString = reduce(
          value,
          (cPre, item) => {
            item = (!!item || String(item) === "0") ? `${key}=${item}` : "";
            return cPre ? `${cPre}${item ? `&${item}` : ""}` : item;
          },
          "",
        );
      } else {
        keyValueString = (!!value || String(value) === "0") ? `${key}=${value}` : "";
      }

      return pre ? `${pre}${keyValueString ? `&${keyValueString}` : ""}` : keyValueString;
    },
    "",
  );
 
  return keyValueString ? `?${keyValueString}` : "";
}