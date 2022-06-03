import _ from 'lodash';

export const searchFilter = (state, action) => {
  const formatQuery = action.search.toLowerCase();
  const filter = state.filterData.map((val) => {
    const data = _.filter(val.BusinessMaster_Home, (keywords) => {
      return contains(keywords, formatQuery);
    });
    return {...val, BusinessMaster_Home: data};
  });
  return filter;
};

const contains = (keywords, query) => {
  const {Buss_Name} = keywords;
  console.log(`Buss_Name: ${JSON.stringify(keywords.Buss_Name)}`);
  if (Buss_Name !== null && Buss_Name !== '' && Buss_Name !== undefined) {
    if (Buss_Name.toLowerCase().includes(query)) {
      return true;
    }
  }
  return false;
};
