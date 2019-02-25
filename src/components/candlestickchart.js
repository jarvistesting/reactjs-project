import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import './../App.css';

am4core.useTheme(am4themes_animated);

class CandleStickChart extends Component {
    componentDidMount() {
        let chart = am4core.create("candleStickChart", am4charts.XYChart);
        chart.paddingRight = 20;

        chart.dateFormatter.inputDateFormat = "YYYY-MM-dd";

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        
        let series = chart.series.push(new am4charts.CandlestickSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "close";
        series.dataFields.openValueY = "open";
        series.dataFields.lowValueY = "low";
        series.dataFields.highValueY = "high";
        series.tooltipText = "Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}";

        series.riseFromPreviousState.properties.fillOpacity = 1;
        series.dropFromPreviousState.properties.fillOpacity = 0;

        chart.cursor = new am4charts.XYCursor();

        var lineSeries = chart.series.push(new am4charts.LineSeries());
        lineSeries.dataFields.dateX = "date";
        lineSeries.dataFields.valueY = "close";

        lineSeries.defaultState.properties.visible = false;

        lineSeries.hiddenInLegend = true;
        lineSeries.fillOpacity = 0.5;
        lineSeries.strokeOpacity = 0.5;
        
        var scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(lineSeries);
        chart.scrollbarX = scrollbarX;

        chart.data = [];
        let keysCollection = Object.keys(this.props.data),
            timeSeries = this.props.data[keysCollection[1]],
            value;
        for (value in timeSeries) {
            var stock_info = timeSeries[value];
            var date = value.split("-");
            var day = date[2].split(" ");
            var key = date[0] + "-" + date[1] + "-" + day[0];
            chart.data.push({date : key, open : stock_info['1. open'],high : stock_info['2. high'],low : stock_info['3. low'], close : stock_info['4. close']});
        }
    }
    render() {
        return(
            <div id="candleStickChart"></div>
        );
    }    
}

export default CandleStickChart;