export interface PaginationArgType {
  eventType: 'next' | 'previous';
  actualpage: { first: number; last: number; actual: number } | undefined;
}
