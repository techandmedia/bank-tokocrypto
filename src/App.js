import React from "react";
import { Spin } from "antd";
import Form from "./components/Form-Account";
import useGetDataCountry from "./api/getDataCountry";
import "./App.css";

export default function App() {
  const [country] = useGetDataCountry("https://restcountries.eu/rest/v2/all");

  React.useEffect(() => {
    console.log(country);
  }, [country]);

  return (
    <React.Fragment>
      <h1>Managing Data Bank Account</h1>
      {!country.isLoading ? (
        <Form country={country.country} />
      ) : (
        <Spin
          tip="Getting Your Data..."
          size="large"
          style={{ marginLeft: "40%" }}
        />
      )}
    </React.Fragment>
  );
}
