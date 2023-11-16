import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import parseQueryString from "./parseQueryString";
import toQueryString from "./toQueryString";
import { ParsedUrlQuery } from "./type";

export function useRouterQuery<T extends ParsedUrlQuery>() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryState = useRef(parseQueryString(search) as T);

  const setQuery = (handler: (prevQuery: T) => T) => {
    const nextQuery = handler(queryState.current);
    queryState.current = nextQuery;

    navigate(toQueryString(nextQuery), {
      replace: true,
    });
  };

  return [queryState.current, setQuery] as [T, typeof setQuery];
}