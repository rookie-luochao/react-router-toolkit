export type ParsedUrlQueryValue = string | string[];

export interface ParsedUrlQuery {
  [key: string]: ParsedUrlQueryValue;
}

export interface Dictionary<T> {
  [key: string]: T;
}

type ParseParam<Param extends ParsedUrlQueryValue> = Param extends `${infer Key}=${infer Value}`
  ? {
      [K in Key]: Value;
    }
  : Dictionary<ParsedUrlQueryValue>;

type MergeValues<One, Other> = One extends Other ? One : Other extends unknown[] ? [One, ...Other] : [One, Other];

type MergeParams<
  OneParam extends Dictionary<ParsedUrlQueryValue>,
  OtherParam extends Dictionary<ParsedUrlQueryValue>,
> = {
  readonly [Key in keyof OneParam | keyof OtherParam]: Key extends keyof OneParam
    ? Key extends keyof OtherParam
      ? MergeValues<OneParam[Key], OtherParam[Key]>
      : OneParam[Key]
    : Key extends keyof OtherParam
    ? OtherParam[Key]
    : never;
};

export type ParseQueryString<Str extends ParsedUrlQueryValue> = Str extends `${infer Param}&${infer Rest}`
  ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
  : ParseParam<Str>;