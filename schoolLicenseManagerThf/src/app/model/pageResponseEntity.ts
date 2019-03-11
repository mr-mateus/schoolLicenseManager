export interface PageResponseEntity<K> {
  hasNext: boolean;
  items: Array<K>;
}
