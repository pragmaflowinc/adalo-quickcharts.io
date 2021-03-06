import React, { Component } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },

  chart: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    //opacity: 1,
  },
});



function isDate(_date) {
  const _regExp = new RegExp(
    "^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$"
  );
  return _regExp.test(_date);
}

const chartBaseUrl = 'https://quickchart.io/chart?encoding=base64&c='

class Quickcharts extends Component {
  render() {
    if (!this.props.listItems) {
      return <View></View>;
    }

    let c = {
      type: this.props.chartType,

      data: {},
    };

    this.props.chartType ? (c.type = this.props.chartType) : (c.type = "bar"),
      (c.data.labels = [
        ...new Set(
          this.props.listItems.map((item) => {
            if (isDate(item.xValues)) {
              return new Date(item.xValues).toDateString();
            }

            return item.xValues;
          })
        ),
      ]);

    const aggregatedData = this.props.listItems.reduce((acc, item) => {
      var xLabel = isDate(item.xValues)
        ? new Date(item.xValues).toDateString()
        : item.xValues;

      if (!acc[xLabel]) {
        //acc[xLabel] = item.yValues
        acc[xLabel] = 1;
      } else {
        //acc[xLabel] += item.yValues
        acc[xLabel] += 1;
      }

      return acc;
    }, {});

    let stylesArray = [];

    let definedStyles = [
      { chartKey: "borderColor", localKey: "borderColor" },
      { chartKey: "backgroundColor", localKey: "backgroundColor" },
      { chartKey: "fill", localKey: "chartFill" },
    ];

    if (Platform.OS === "ios") {
      definedStyles = [
        { chartKey: "borderColor", localKey: "borderColor" },
        { chartKey: "backgroundColor", localKey: "backgroundColor" },
        { chartKey: "fill", localKey: "chartFill" },
      ];
    }

    definedStyles.map((item) => {
      if (this.props[item.localKey]) {
        //stylesArray.push(`${item.chartKey}:'${encodeURIComponent(this.props[item.localKey])}'`);
        stylesArray.push(`${item.chartKey}:'${this.props[item.localKey]}'`);
      }
      // if(!this.props[item.localKey] && !this.props[item.chartKey] == 'fill'){
      // stylesArray.push(`${item.chartKey}:false`);
      // }
    });

    c.data.datasets = [
      {
        label: this.props.dataSetName,
        data: Object.keys(aggregatedData).map((key) => aggregatedData[key]),
      },
    ];

    if (this.props.editor) {
      //const chartUrl = "https://quickchart.io/chart?encoding=base64&c=" + encodeURIComponent(`{type:'${c.type}',data:{labels:['Thing 1','Thing 2'],datasets:[{label:'Daily Orders',data:['3','1'],${stylesArray.join(',')}}]}}`);
      const chartUrl = chartBaseUrl + Buffer.from(`{type:'${c.type}',data:{labels:['Thing 1','Thing 2'],datasets:[{label:'Daily Orders',data:['3','1'],${stylesArray.join(',')}}]}}`).toString('base64');

      return (
        <View style={styles.wrapper}>
          <p>Quickcharts Beta</p>
          <Image
            style={styles.chart}
            source={{
              uri: chartUrl,
            }}
          />
        </View>
      );
    }

    const chartUrl = chartBaseUrl +
      Buffer.from(`{type:'${c.type
        }',data:{labels:[${c.data.labels
          .map((label) => `'${label}'`)
          .join(",")}],datasets:[${c.data.datasets
            .map((dataset) => {
              return `{label:'${dataset.label}',data:[${dataset.data.join(",")}],${stylesArray.join(',')}}`;
            })
            .join(",")},]}}`
      ).toString("base64");

    return (
      <View style={styles.wrapper}>
        <Image
          style={styles.chart}
          source={{
            uri: chartUrl,
          }}
        />
      </View>
    );
  }
}

export default Quickcharts;
