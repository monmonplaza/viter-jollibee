import { queryData } from "./queryData";

export const queryDataInfinite = (
  urlSearch,
  urlList,
  isSearch = false,
  searchData = isSearch ? searchData : {},
  method = isSearch ? "post" : "get"
) => {
  return queryData(isSearch ? urlSearch : urlList, method, searchData);
};
