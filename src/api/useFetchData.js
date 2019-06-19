import { useState, useEffect, useReducer } from "react";
import axios from "axios";

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
        ...state,
        isLoading: false,
        data: action.payload
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

export default function useFetchData(initialAPI, initialQueries) {
  const [api, setAPI] = useState(initialAPI);
  const [queries, setQueries] = useState(initialQueries);

  const [state, dispatch] = useReducer(fetchReducer, {
    isLoading: true,
    isError: false,
    data: []
  });

  useEffect(() => {
    let didCancel = false;

    async function getData() {
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await axios(api);
        // console.log(result.data);

        if (!didCancel) {
          // console.log(result);
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    }

    if (api !== "") {
      getData();
    }

    return () => {
      didCancel = true;
    };
  }, [api, queries]);

  function refetch(newApi, newQueries) {
    // console.log(newApi, newQueries);
    setAPI(newApi);
    setQueries(newQueries);
  }

  return [state, refetch];
}
