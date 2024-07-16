export const getDefaultFetchState = () => (
  JSON.parse(JSON.stringify(
    {
      data: [],
      isFetching: false,
      isSuccess: false,
      hasData: false,
      isError: false,
    },
  ))
);

export default function baseFetchReducer(
  name,
  state,
  action,
  // rejectionCallback = null,
) {
  switch (action.type) {
    case `FETCH_${name}_PENDING`:
      return {
        ...state,
        isFetching: true,
        isSuccess: false,
        isError: false,
      };
    case `FETCH_${name}_FULFILLED`:
      // console.log('recipes:');
      // console.log(action.payload.data);
      return {
        ...state,
        isFetching: false,
        isSuccess: true,
        hasData: true,
        isError: false,
        data: action.payload.data.data,
      };
    case `FETCH_${name}_REJECTED`:
      // this is an anti-pattern. instead react to a bad response in the component
      // if (rejectionCallback !== null) {
      //   rejectionCallback(state);
      // }
      return {
        ...state,
        isFetching: false,
        isSuccess: false,
        hasData: false,
        isError: true,
      };
    default:
      return {
        ...state,
      };
      // throw new Error(action.type);
  }
}
