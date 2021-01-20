import React, { Component } from 'react';
import './TimeContentBlock.css';
import signalIcon from '../assets/icon_signal.svg';
import batteryIcon from '../assets/icon_battery.svg';

export default class TimeContentBlock extends Component {
   constructor(props) {
      super(props)
      this.state = {
         time: '',
         signalLTE: '3G'
      };
   };

   componentDidMount() {
      this.getTime();
      this.intervalID = setInterval(() => this.getTime(), 1000);
   };

   componentWillUnmount() {
      clearInterval(this.intervalID);
   };
   // Получаем и устанавливаем время
   getTime() {
      let date = new Date();
      let timeHours = date.getHours();
      let timeMinutes = date.getMinutes();
      // let timeSeconds = date.getSeconds();
      function addZero(t) {
         return t = t < 10 ? '0' + t : t
      };
      // timeHours = timeHours < 10 ? '0' + timeHours : timeHours;
      // timeMinutes = timeMinutes < 10 ? '0' + timeMinutes : timeMinutes;
      // timeSeconds = timeSeconds < 10 ? '0' + timeSeconds : timeSeconds;

      this.setState({
         time: `${addZero(timeHours)}:${addZero(timeMinutes)}`
      });
   };

   render() {

      return (
         <div className="row top-row">
            <div className="top-time">{this.state.time}</div>
            <div className="top-menu">
               <img src={signalIcon} alt="signalLTE" />
               <span>{this.state.signalLTE}</span>
               <img src={batteryIcon} alt="batteryIcon" />
            </div>
         </div>
      );
   };
};
