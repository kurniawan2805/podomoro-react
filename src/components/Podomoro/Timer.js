import React, { Component } from "react";

import "./Timer.css";

class Timer extends Component {
  constructor() {
    super();
    // set initial state
    this.state = {
      alert: {
        type: "",
        message: ""
      },
      time: 0,
      paused: false
    };

    //Defined times for work, short breakt, and long break
    this.times = {
      defaultTime: 1500, // 25 min
      shortBreak: 300, // 5min
      longBreak: 600 //10min
    };
  }

  componentDidMount() {
    // Set default time when first mounted
    this.setDefault();
  }
  setDefault = () => {
    this.setState({
      alert: {
        type: "buz",
        message: "Welcome to Podomoro technique"
      },
      time: this.times.defaultTime
    });
  };

  // set Pause Flag
  setTimePause = () => {
    this.setState({
      paused: true
    });
  };

  setTimeStart = () => {
    this.setState({
      paused: false
    });
  };

  setTime = newTime => {
    this.restartInterval();
    this.setState({
      time: newTime
    });
  };

  setTimeReset = () => {
    this.setState({
      paused: false,
      time: 0
    });
  };

  restartInterval = () => {
    // clearing the interval
    clearInterval(this.interval);

    // execute countdown function every second
    this.interval = setInterval(this.countDown, 1000);
  };

  countDown = () => {
    // display alert when count time reach 0
    if (this.state.time === 0) {
      this.setState({
        alert: {
          type: "buz",
          message: "Buzzzzz"
        }
      });
    } else if (!this.state.paused) {
      // Decrease second time
      this.setState(prevState => ({
        time: prevState.time - 1
      }));
    }
  };

  displayTimer(second) {
    // Time Format
    const min = Math.floor((second % 3600) / 60);
    const sec = Math.floor((second % 3600) % 60);
    return `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
  }

  // setTIme State
  setTimeForWork = () => {
    this.setState({
      alert: {
        type: "work",
        message: "Start working!"
      }
    });
    return this.setTime(this.times.defaultTime);
  };

  setTimeForShortBreak = () => {
    this.setState({
      alert: {
        type: "shortBreak",
        message: "Taking a short break!"
      }
    });
    return this.setTime(this.times.shortBreak);
  };

  setTimeForLongBreak = () => {
    this.setState({
      alert: {
        type: "longBreak",
        message: "Taking a long break !"
      }
    });
    return this.setTime(this.times.longBreak);
  };

  render() {
    const {
      alert: { message, type },
      time
    } = this.state;

    return (
      <div className="Podomoro">
        <div className={`alert ${type}`}>{message}</div>
        <div className="types">
          <button className="start" onClick={this.setTimeForWork}>
            Start Working
          </button>
          <button className="short" onClick={this.setTimeForShortBreak}>
            Short Break
          </button>
          <button className="long" onClick={this.setTimeForLongBreak}>
            Long Break
          </button>
        </div>
        <div className="timer">{this.displayTimer(time)}</div>
        <div className="time-control">
          <button className="start" onClick={this.setTimeStart}>
            Start
          </button>
          <button className="short" onClick={this.setTimePause}>
            Pause
          </button>
          <button className="long" onClick={this.setTimeReset}>
            Reset
          </button>
        </div>

        <div className="nav-brand">
          <img
            src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Ftimstout.files.wordpress.com%2F2011%2F05%2Fpomodoro-technique.png&f=1"
            alt="podomoro logo "
            height="180px"
          />
        </div>
      </div>
    );
  }
}

export default Timer;
