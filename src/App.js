import React, { useEffect, useState } from "react";
import { Spin, Row, Col, Table } from "antd";
import Form from "./components/Form-Account";
import useGetDataCountry from "./api/getDataCountry";
import columns from "./components/table-column";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "./App.css";

import Button from "devextreme-react/button";
import Chart, { ArgumentAxis, Series, Legend } from "devextreme-react/chart";
// import JQueryCharts from "./components/JQuery-Charts";

const dataChart = [
  {
    arg: 1990,
    val: 5320816667
  },
  {
    arg: 2000,
    val: 6127700428
  },
  {
    arg: 2010,
    val: 6916183482
  }
];

let data = [];

export default function App() {
  const [country] = useGetDataCountry("https://restcountries.eu/rest/v2/all");
  const [accountType, setAccountType] = useState(0);
  const [dataTable, setDataTable] = useLocalStorage([]);
  const [switchDisplay, setDisplay] = useState(true);
  const [buttonTitle, setButtonTitle] = useState("");
  const [appTitle, setAppTitle] = useState("");

  useEffect(() => {
    console.log(dataTable);
  }, [dataTable]);

  useEffect(() => {
    if (switchDisplay) {
      setAppTitle("DEMO Charts");
      setButtonTitle("Switch to Form & Table");
    }
    if (!switchDisplay) {
      setAppTitle("Managing Data Bank Account");
      setButtonTitle("Switch to Charts");
    }
  }, [switchDisplay]);

  const tableColumns = columns();

  return (
    <div style={{ padding: "20px 30px" }}>
      <h1>{appTitle}</h1>
      <Button
        text={buttonTitle}
        onClick={() => setDisplay(!switchDisplay)}
        style={{ marginLeft: "43%", marginBottom: "10px" }}
      />

      {switchDisplay ? (
        // <JQueryCharts />
        <Chart dataSource={dataChart}>
          <ArgumentAxis tickInterval={10} />
          <Series type="bar" />
          <Legend visible={false} />
        </Chart>
      ) : !country.isLoading ? (
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
