import { parseQueryString } from "../parseQueryString.ts";
import { toQueryString } from "../toQueryString.ts";

const basicMap = {
  url: "https://www.google.com",
  name: "google",
  tags: ["search", "find", "discover", "https://www.baidu.com"],
}

console.log('querystring:', toQueryString(basicMap));
console.log('querymap:', parseQueryString(toQueryString(basicMap)));