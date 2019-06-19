const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 8 },
    sm: { span: 8 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

const optionsCity = [
  {
    value: "Jakarta",
    label: "Jakarta"
  },
  {
    value: "Bandung",
    label: "Bandung"
  },
  {
    value: "Malang",
    label: "Malang"
  }
];

const optionsCountry = [
  {
    value: "Indonesia",
    label: "Indonesia"
  },
  {
    value: "Singapore",
    label: "Singapore"
  },
  {
    value: "Malaysia",
    label: "Malaysia"
  }
];

export { formItemLayout, tailFormItemLayout, optionsCity, optionsCountry };
