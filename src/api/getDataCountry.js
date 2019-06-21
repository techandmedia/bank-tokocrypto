import { useEffect, useReducer } from "react";
import useFetchData from "./useFetchData";

// ===== USE REDUCER ==========
function fetchReducer(state, action) {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":
      return {
        // ...state,
        isLoading: false,
        country: action.payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
}

export default function useGetDataCountry(initialAPI) {
  const [country] = useFetchData(initialAPI);
  const [state, dispatch] = useReducer(fetchReducer, {
    isLoading: true,
    isError: false,
    data: []
  });

  useEffect(() => {
    function getData() {
      let didCancel = false;

      // === REFORM DATA ===
      let temp = reformData(country.data);
      // console.log(temp);

      try {
        if (!didCancel) {
          dispatch({
            type: "FETCH_SUCCESS",
            payload: temp
          });
        }
      } catch (error) {
        console.log(error);
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    }
    if (!country.isLoading) {
      getData();
    }
  }, [country]);

  return [state];
}

function reformData(country) {
  // console.log(country);
  let temp = country.map((item, index) => ({
    value: item.name,
    label: item.name,
    code: item.currencies[0].code,
    currencies_symbol: item.currencies[0].symbol
  }));

  return temp;
}
