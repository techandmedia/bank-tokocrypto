import React, { Component } from "react";
import { Form, Input, Cascader, Select, Button, Icon } from "antd";
import {
  formItemLayout,
  tailFormItemLayout,
  optionsCity,
  optionsCountry
} from "./utils";

class AccountForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { Option } = Select;
    const { getFieldDecorator } = this.props.form;
    const { country } = this.props;
    console.log(country);
    console.log(optionsCountry);
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select style={{ width: 70 }}>
        <Option value="usd">
          <Icon type="setting" />
        </Option>
        <Option value="idr">+87</Option>
      </Select>
    );

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

        <Form.Item label="Account Number">
          {getFieldDecorator("acct_number", {
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
          })(<Cascader options={country} />)}
        </Form.Item>

        <Form.Item label="Currency">
          {getFieldDecorator("curr", {
            rules: [{ required: true }]
          })(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
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
