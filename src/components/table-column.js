export default function columns() {
  const columns = [
    {
      title: "Account Name",
      dataIndex: "acct_name",
      key: "acct_name"
    },
    {
      title: "Company Name",
      dataIndex: "company",
      key: "company"
    },
    {
      title: "Account Number",
      dataIndex: "acct_number",
      key: "acct_number"
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country"
    },
    {
      title: "Currency",
      dataIndex: "curr",
      key: "curr"
    }
  ];

  return columns;
}
