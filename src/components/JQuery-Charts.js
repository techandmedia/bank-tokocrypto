import React, { Component } from "react";
import dataSource from "./data-source";

class Charts extends Component {

  componentDidMount() {
    this.$el = $(this.el);
    this.$el.dxChart({
      title: "Stock Price",
      dataSource: dataSource,
      commonSeriesSettings: {
        argumentField: "date",
        type: "stock"
      },
      series: [
        {
          name: "DELL",
          openValueField: "o",
          highValueField: "h",
          lowValueField: "l",
          closeValueField: "c",
          reduction: {
            color: "red"
          }
        }
      ],
      valueAxis: {
        tickInterval: 1,
        title: {
          text: "US dollars"
        },
        label: {
          format: {
            type: "currency",
            precision: 0
          }
        }
      },
      argumentAxis: {
        workdaysOnly: true,
        label: {
          format: "shortDate"
        }
      },
      export: {
        enabled: true
      },
      tooltip: {
        enabled: true,
        location: "edge",
        customizeTooltip: function(arg) {
          return {
            text:
              "Open: $" +
              arg.openValue +
              "<br/>" +
              "Close: $" +
              arg.closeValue +
              "<br/>" +
              "High: $" +
              arg.highValue +
              "<br/>" +
              "Low: $" +
              arg.lowValue +
              "<br/>"
          };
        }
      }
    });
  }

  componentWillUnmount() {
    this.$el.dxChart("destroy");
  }

  render() {
    return <div ref={el => (this.el = el)} />;
  }
}

export default Charts;
