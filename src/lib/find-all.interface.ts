interface IFindAll<T> {
  items: T[];
  total: number;
  page: number;
  lastPage: number;
  limit: number;
}
