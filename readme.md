### API

##### parseQueryString: queryString to queryMap
```js
const queryString = 'name=zhangshan&age=18&height=180'
const queryString2 = '?name=zhangshan&age=18&height=180'

const queryMap = parseQueryString(queryString)
const queryMap2 = parseQueryString(queryString2)
```

##### toQueryString: queryMap to queryString
```js
const queryMap = {
  name: 'zhangshan',
  age: 18,
  height: 180,
}

const queryString = toQueryString(queryMap)
```

##### useRouterQuery: quick get query and set query
```js
interface IQueryMap {
  name: string;
  age: string;
  height: string;
  loves: ParsedUrlQuery;
}

const [routerRuery, setRouterQuery] = useRouterQuery<IQueryMap>();
const name = routerRuery.name;
const loves = routerRuery.loves;
// or
const [{ name, loves }, setRouterQuery] = useRouterQuery<IQueryMap>();

setRouterQuery((preState) => ({
  ...preState,
  name: "lisi",
}));
```

### common interface

##### Dictionary
```js
interface Dictionary<T> {
  [key: string]: T;
}
```

##### ParsedUrlQueryValue
```js
type ParsedUrlQueryValue = string | string[];
```

##### ParsedUrlQuery
```js
interface ParsedUrlQuery {
  [key: string]: ParsedUrlQueryValue;
}
```