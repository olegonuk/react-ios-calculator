import React, { Component } from 'react'
import './App.css';
import TimeContentBlock from './Components/TimeContentBlock';
import ButtonBlock from './Components/ButtonBlock';
import BottomBlock from './Components/BottomBlock';

export default class App extends Component {

  render() {

    return (
      <div className="App">

        <div className="block-calc">
          <TimeContentBlock />
          <ButtonBlock />
          <BottomBlock />
        </div>

      </div>
    )
  }
}

