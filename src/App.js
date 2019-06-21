import React, { useState } from "react";
import { Spin, Row, Col, Table } from "antd";
import Form from "./components/Form-Account";
import useGetDataCountry from "./api/getDataCountry";
import columns from "./components/table-column";
import "./App.css";

export default function App() {
  const [country] = useGetDataCountry("https://restcountries.eu/rest/v2/all");
  const [state, setTableState] = useState([]);
  const [accountType, setAccountType] = useState(0);

  React.useEffect(() => {
    console.log(country);
  }, [country]);

  const tableColumns = columns();
  console.log(tableColumns);

  return (
    <React.Fragment>
      <h1>Managing Data Bank Account</h1>
      {!country.isLoading ? (
        <Row gutter={32}>
          <Col span={12}>
            <Form
              country={country.country}
              accountType={accountType}
              setAccountType={setAccountType}
            />
          </Col>
          <Col span={12}>
            <Table dataSource={state} columns={tableColumns} bordered />
          </Col>
        </Row>
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
