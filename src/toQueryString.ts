import reduce from "lodash-es/reduce.js";
import { ParsedUrlQuery } from "./type";

// 将queryMap数据转换成queryString
export function toQueryString(queryObj: ParsedUrlQuery, isNotEncode?: boolean) {
  if (!queryObj) return "";

  const keyValueString = reduce(
    queryObj,
    (pre, value, key) => {
      let keyValueString = "";

      if (Array.isArray(value)) {
        keyValueString = reduce(
          value,
          (cPre, item) => {
            item = (!!item || String(item) === "0") ? `${key}=${isNotEncode ? item : encodeURIComponent(item)}` : "";
            return cPre ? `${cPre}${item ? `&${item}` : ""}` : item;
          },
          "",
        );
      } else {
        keyValueString = (!!value || String(value) === "0") ? `${key}=${isNotEncode ? value : encodeURIComponent(value)}` : "";
      }

      return pre ? `${pre}${keyValueString ? `&${keyValueString}` : ""}` : keyValueString;
    },
    "",
  );
 
  return keyValueString ? `?${keyValueString}` : "";
}