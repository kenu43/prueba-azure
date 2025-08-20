import { PaginationArgType } from '../types/PaginationType';
import { PaginationPayloadType } from '../types/ContextType';

export const PaginationFunction = ({
  eventType,
  actualpage,
}: PaginationArgType): PaginationPayloadType => {
  if (eventType === 'next')
    return {
      first: actualpage?.first! + 10,
      last: actualpage?.last! + 10,
      actual: actualpage?.actual! + 1,
    };

  return {
    first: actualpage?.first! - 10,
    last: actualpage?.last! - 10,
    actual: actualpage?.actual! - 1,
  };
};
