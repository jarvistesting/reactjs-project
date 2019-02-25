import React, { Component } from 'react';
import CandleStickChart from './components/candlestickchart';
import './App.css';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data : [],
        isLoading: true
      }
    }
    componentDidMount() {
      this.fetchUsers();
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  fetchUsers() {
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          data: data,
          isLoading:false
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    return (
      <div className="App">
        <h3>CandleStick Chart</h3>
        {this.state.isLoading ? 
          "Loading Chart..."
        : 
        <CandleStickChart data={this.state.data} />}
      </div>
    );
  }
}

export default App;
