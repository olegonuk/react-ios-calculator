import React, { Component } from 'react';
import './ButtonBlock.css';

export default class ButtoBlock extends Component {
   constructor(props) {
      super(props)
      this.state = {
         value: null,
         displayView: '0',
         clearBtn: 'AC',
         memoryNum: '0',
         waittingForOperand: true,
         operator: null,
         fsize: `55px`
      };
   };
   // Очистка числа в памяти 'MC'
   mrClear() {
      this.setState({
         memoryNum: '0'
      });
   };
   //Считывание на экран числа в памяти 'MR'
   mrRead() {
      const { memoryNum } = this.state;
      this.setState({
         displayView: memoryNum
      });
   };
   // Прибавление числа в памяти 'M+'
   mrPlus() {
      const { memoryNum, displayView } = this.state;
      this.setState({
         memoryNum: String(Number(memoryNum) + Number(displayView))
      });
   };
   // Отнимание числа в памяти 'M-'
   mrMinus() {
      const { memoryNum, displayView } = this.state;
      this.setState({
         memoryNum: String(Number(displayView) - Number(memoryNum))
      });
   };
   //Очистка значений 'AC'
   clearDisplayValue() {
      this.setState({
         value: null,
         displayView: '0',
         clearBtn: 'AC',
         waittingForOperand: true,
         operator: null,
         fsize: `55px`
      });
   };
   // Добавить/Убрать знак минус '-'
   toggleMinus() {
      const { displayView } = this.state;
      this.setState({
         displayView: displayView.indexOf('-') === -1 ? '-' + displayView : displayView.slice(1),
         waittingForOperand: displayView.indexOf('-') === -1 ? false : true
      });
   };
   //Получение % числа
   percentNum() {
      const { displayView } = this.state;
      const val = parseFloat(displayView);
      this.setState({
         displayView: String((val / 100).toFixed(3))
      });
   };
   // Ввод чисел
   inputNum(num) {
      const state = this.state;
      if (state.waittingForOperand) {
         this.setState({
            displayView: String(num),
            waittingForOperand: false,
            clearBtn: 'C'
         });
      } else {
         this.setState({
            displayView: state.displayView === '0' ? String(num) : state.displayView === '-0' ? '-' + num : state.displayView + num,
            clearBtn: 'C'
         });
      };
      this.scaleView();
   };
   // Масштабирование вывода чисел на экран
   scaleView() {
      const { displayView } = this.state;
      if (displayView.length > 5) {
         this.setState({
            fsize: '40px'
         });

         if (displayView.length > 8) {
            this.setState({
               fsize: '30px'
            });
         };
      };
   };
   // Добавление точки
   addDot() {
      const { displayView, waittingForOperand, operator } = this.state;

      if ((waittingForOperand && operator) || (waittingForOperand && operator === null)) {
         this.setState({
            displayView: '0.',
            clearBtn: 'C',
            waittingForOperand: false
         });
      } else if (displayView.indexOf('.') === -1) {
         this.setState({
            displayView: displayView + '.',
            waittingForOperand: false
         });
      };
   };
   //Вычесление операции
   performOperation(nextOperator) {
      const { displayView, operator, value } = this.state;
      // Сохраняем значение первого числа
      const nextValue = parseFloat(displayView);

      const operations = {
         '/': (prevValue, nextValue) => prevValue / nextValue,
         '*': (prevValue, nextValue) => prevValue * nextValue,
         '+': (prevValue, nextValue) => prevValue + nextValue,
         '-': (prevValue, nextValue) => prevValue - nextValue,
         '=': (prevValue, nextValue) => nextValue,
      };

      if (value === null) {
         this.setState({
            value: nextValue
         });
      } else if (operator) {
         // Сохраняем значение второго числа(после нажатия знака операции)
         const currenValue = value || 0;
         const computedValue = operations[operator](currenValue, nextValue);
         this.setState({
            value: computedValue,
            displayView: String(computedValue).indexOf('.') === -1 ? String(computedValue) : String(computedValue.toFixed(3))
         });
      };
      //Меняем статус для ожидпния знака, для возможности ввода второга и записываем знак
      this.setState({
         waittingForOperand: true,
         operator: nextOperator
      });
   };


   render() {
      const { displayView, clearBtn, fsize } = this.state;

      return (
         <>
            <div className="row">
               <div style={{ fontSize: `${fsize}` }} className="block-calc-val">{displayView}</div>
            </div>
            <div className="row">
               <div id="clear-btn" className="btn-calc gray" onClick={() => this.clearDisplayValue()}>{clearBtn}</div>
               <div id="addMinus-btn" className="btn-calc gray" onClick={() => this.toggleMinus()} sign="-">+/-</div>
               <div id="percent-Btn" className="btn-calc gray" onClick={() => this.percentNum()}>%</div>
               <div className="btn-calc btn-operator yellow" onClick={() => this.performOperation('/')} sign="/">&divide;</div>
            </div>
            <div className="row">
               <div id="btn-mr-clear" className="btn-calc btn-operator" onClick={() => this.mrClear()}>mc</div>
               <div id="btn-mr-read" className="btn-calc btn-operator" onClick={() => this.mrRead()}>mr</div>
               <div id="btn-mr-minus" className="btn-calc btn-operator" onClick={() => this.mrMinus()}>m-</div>
               <div id="btn-mr-plus" className="btn-calc btn-operator yellow" onClick={() => this.mrPlus()}>m+</div>
            </div>
            <div className="row">
               <div className="btn-calc btn-number" onClick={() => this.inputNum(7)}>7</div>
               <div className="btn-calc btn-number" onClick={() => this.inputNum(8)}>8</div>
               <div className="btn-calc btn-number" onClick={() => this.inputNum(9)}>9</div>
               <div id="btn-multiply" className="btn-calc btn-operator yellow" onClick={() => this.performOperation('*')} sign="*">&times;</div>
            </div>
            <div className="row">
               <div className="btn-calc btn-number" onClick={() => this.inputNum(4)}>4</div>
               <div className="btn-calc btn-number" onClick={() => this.inputNum(5)}>5</div>
               <div className="btn-calc btn-number" onClick={() => this.inputNum(6)}>6</div>
               <div id="btn-minus" className="btn-calc btn-operator yellow" onClick={() => this.performOperation('-')} sign="-">&#8722;</div>
            </div>
            <div className="row">
               <div className="btn-calc btn-number" onClick={() => this.inputNum(1)}>1</div>
               <div className="btn-calc btn-number" onClick={() => this.inputNum(2)}>2</div>
               <div className="btn-calc btn-number" onClick={() => this.inputNum(3)}>3</div>
               <div id="btn-plus" className="btn-calc btn-operator yellow" onClick={() => this.performOperation('+')} sign="+">+</div>
            </div>
            <div className="row">
               <div className="btn-calc btn-number btn-zero" onClick={() => this.inputNum(0)}>0</div>
               <div className="btn-calc btn-dot" onClick={() => this.addDot()}>&sbquo;</div>
               <div id="btn-equal" className="btn-calc  yellow" onClick={() => this.performOperation('=')} sign="=">=</div>
            </div>
         </>
      );
   };
};
