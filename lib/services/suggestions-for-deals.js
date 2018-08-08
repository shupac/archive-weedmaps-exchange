import get from 'lodash.get';
import type {
  SuggestionsCallParams,
  SuggestionsCallReturn,
} from 'lib/types/suggestions';

const sortListingResults = (a: Object, b: Object) => {
  if (a.distance > b.distance) return 1;
  if (b.distance > a.distance) return -1;
  return 0;
};

const suggestionsForDeals = async (
  params: SuggestionsCallParams,
): SuggestionsCallReturn => {
  const { phrase, searchStore, searchTypes, location } = params;
  const latlng = location
    ? `${get(location, 'lat')},${get(location, 'lng')}`
    : false;
  const listingsBySearchType = await searchStore.suggestions(
    latlng,
    phrase,
    searchTypes || [],
    20,
  );

  let combinedResults = [];
  // combine listingsBySearchType into one array
  Object.keys(listingsBySearchType).forEach(type => {
    combinedResults = combinedResults.concat(listingsBySearchType[type]);
  });
  combinedResults = combinedResults.filter(Boolean);

  // sort by closest listings first
  combinedResults.sort(sortListingResults);

  return combinedResults;
};

export default suggestionsForDeals;
