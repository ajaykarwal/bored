import React, { Component } from "react";

const API = "https://www.boredapi.com/api/activity?";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessibility: 0.2,
      activity: "",
      key: null,
      participants: 1,
      price: 0,
      type: "",
    };
    this.handleSubmitRandom = this.handleSubmitRandom.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(newState) {
    let QUERY = "";

    if (newState !== undefined) {
      console.table(newState);
      
      const { accessibility, participants, price, type } = newState;
      QUERY = `accessibility=${accessibility}&participants=${participants}&price=${price}&type=${type}`;
    }

    fetch(API + QUERY)
      .then(response => response.json())
      .then(data => {
        console.log(data);

        if (data["error"]) {
          this.setState({
            activity: data["error"]
          })
        } else {

          this.setState({
            activity: data.activity,
            type: data.type,
            participants: data.participants,
            price: data.price,
            key: data.key,
          });
        }
      })
      .catch(function(err) {
        console.log("error", err);
    });
  }

  handleSubmitRandom() {
    this.fetchData();
  }
  handleSubmit(event) {
    event.preventDefault();

    let newState = {
      type: event.target[0].value,
      participants: event.target[1].value,
      price: event.target[2].value,
      accessibility: event.target[3].value,
    }
    this.fetchData(newState);
  }

  // LIFECYCLE METHODS
  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="App">
        
        <p className="question">Are you bored?</p>
        <h1 className="activity">{this.state.activity}</h1>
        <input className="btn" type="submit" onClick={this.handleSubmitRandom} value="Refresh" />

        <hr />

        <h2>Still bored? Try something more specfic</h2>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="inputType">Type of activity</label>
            <select
              name="inputType"
              id="inputType"
              defaultValue={this.state.type}
            >
              <option value="">Random</option>
              <option value="education">Education</option>
              <option value="recreational">Recreational</option>
              <option value="social">Social</option>
              <option value="diy">Diy</option>
              <option value="charity">Charity</option>
              <option value="cooking">Cooking</option>
              <option value="relaxation">Relaxation</option>
              <option value="music">Music</option>
              <option value="busywork">Busywork</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="inputParticipants">Number of participants</label>
            <input
              type="number"
              name="inputParticipants"
              id="inputParticipants"
              min="1"
              defaultValue={this.state.participants}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPrice">Price range (0-1)</label>
            <input
              type="range"
              name="inputPrice"
              id="inputPrice"
              min="0"
              step="0.01"
              defaultValue={this.state.price}
            />
          </div>

          <div className="form-group">
            <label htmlFor="inputAccessibility">Difficulty (0-1)</label>
            <input
              id="inputAccessibility"
              type="range"
              min="0.0"
              max="1.0"
              step="0.1"
              defaultValue={this.state.accessibility}
            />
          </div>

          <input className="btn" type="submit" value="Give me something to do" />
        </form>
      </div>
    );
  }
}
export default App;
