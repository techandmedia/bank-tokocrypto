import React, { Component } from "react";
import { Form, Input, Cascader, Radio, Button } from "antd";
import { formItemLayout, tailFormItemLayout, optionsCity } from "./utils";

class AccountForm extends Component {
  state = {
    curr_code: "",
    curr_symbol: ""
  };

  handleSubmit = e => {
    let temp = [];
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        temp.push({
          acct_name: values.acct_name,
          company: values.company_name,
          first_name: values.first_name,
          last_name: values.last_name,
          acct_number: values.acct_number,
          country: values.country
          // curr: values.
        });
        this.props.setDataTable(temp);
      }
    });
  };

  filter = (inputValue, path) => {
    return path.some(
      option =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };

  onCountryChange = c => {
    let temp = this.props.country.filter(item => item.value === c[0]);
    const [{ code, currencies_symbol }] = temp;
    this.setState({
      curr_code: code,
      curr_symbol: currencies_symbol
    });
  };

  onRadioChange = e => {
    this.props.setAccountType(e.target.value);
  };

  render() {
    const { curr_code, curr_symbol } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { country, accountType } = this.props;

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Account Holder Name">
          {getFieldDecorator("acct_name", {
            rules: [
              {
                required: true
              }
            ]
          })(<Input />)}
        </Form.Item>

        {accountType === 1 ? (
          <React.Fragment>
            <Form.Item label="First Name">
              {getFieldDecorator("first_name", {
                rules: [
                  {
                    required: true
                  }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Last Name">
              {getFieldDecorator("last_name", {
                rules: [
                  {
                    required: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
          </React.Fragment>
        ) : (
          accountType === 2 && (
            <Form.Item label="Company Name">
              {getFieldDecorator("company_name", {
                rules: [
                  {
                    required: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
          )
        )}

        <Form.Item label="Account Type">
          <Radio.Group onChange={this.onRadioChange} value={accountType}>
            <Radio value={1}>Individual</Radio>
            <Radio value={2}>Company</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Account Number">
          {getFieldDecorator("acct_number", {
            rules: [
              {
                required: true
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Swift Code">
          {getFieldDecorator("swift_code", {
            rules: [
              {
                required: true
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Address">
          {getFieldDecorator("address", {
            rules: [
              {
                required: true
              }
            ]
          })(<Input.TextArea />)}
        </Form.Item>

        <Form.Item label="City">
          {getFieldDecorator("city", {
            rules: [
              {
                required: true
              }
            ]
          })(<Cascader options={optionsCity} />)}
        </Form.Item>

        <Form.Item label="Country">
          {getFieldDecorator("country", {
            rules: [
              {
                required: true
              }
            ]
          })(
            <Cascader
              options={country}
              showSearch={this.filter}
              onChange={this.onCountryChange}
            />
          )}
        </Form.Item>

        <Form.Item label="Currency">
          {getFieldDecorator("curr", {
            // initialValue: curr_symbol,
          })(
            <React.Fragment>
              {curr_code !== "" && (
                <span
                  style={{
                    color: "white",
                    background: "orange",
                    padding: 10,
                    width: "100%"
                  }}
                >
                  {curr_code} / {curr_symbol}
                </span>
              )}
            </React.Fragment>
          )}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const DefaultAccountForm = Form.create({ name: "register" })(AccountForm);

export default DefaultAccountForm;
