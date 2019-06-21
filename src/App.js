import React, { useEffect, useState } from "react";
import { Spin, Row, Col, Table } from "antd";
import Form from "./components/Form-Account";
import useGetDataCountry from "./api/getDataCountry";
import columns from "./components/table-column";
import "./App.css";

let data = [];

export default function App() {
  const [country] = useGetDataCountry("https://restcountries.eu/rest/v2/all");
  const [accountType, setAccountType] = useState(0);
  const [dataTable, setDataTable] = useLocalStorage([]);

  React.useEffect(() => {
    console.log(dataTable);
  }, [dataTable]);

  const tableColumns = columns();

  return (
    <div style={{ padding: "20px 30px" }}>
      <h1>Managing Data Bank Account</h1>
      {!country.isLoading ? (
        <Row>
          <Col span={8}>
            <Form
              country={country.country}
              accountType={accountType}
              setAccountType={setAccountType}
              setDataTable={setDataTable}
            />
          </Col>
          <Col span={16}>
            <Table dataSource={dataTable} columns={tableColumns} bordered />
          </Col>
        </Row>
      ) : (
        <Spin
          tip="Getting Your Data..."
          size="large"
          style={{ marginLeft: "40%" }}
        />
      )}
    </div>
  );
}

function useLocalStorage(key) {
  const [value, setValue] = useState(localStorage.getItem(key) || []);
  const [dataTemp, setDataTemp] = useState([]);

  useEffect(() => {
    // console.log(key, value);
    setDataTemp(value);
  }, [value]);

  useEffect(() => {
    // console.log(dataTemp);
    localStorage.setItem(key, dataTemp.map(item => data.push(item)));
  }, [dataTemp]);

  return [data, setValue];
}
