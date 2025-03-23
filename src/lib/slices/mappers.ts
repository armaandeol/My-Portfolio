// In $lib/slices/mappers.ts or similar
import ContentIndexMapper from './ContentIndex/mapper';

export const mappers = {
  contentindex: ContentIndexMapper,  // This key must match the slice_type exactly
  // other mappers...
};