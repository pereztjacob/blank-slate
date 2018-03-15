import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { makeChoice } from './actions';
import './Player.css';

class Player extends PureComponent {

  constructor(props) {
    super(props);
    const { zero, one, two, three, four, five, six, seven, eight } = props;

    this.keys = {
      [zero]: 'zero',
      [one]: 'one',
      [two]: 'two',
      [three]: 'three',
      [four]: 'four',
      [five]: 'five',
      [six]: 'six',
      [seven]: 'seven',
      [eight]: 'eight'
    };
  }
  componentDidMount() {
    // listen for keypress
    document.addEventListener('click', this.handleClick);
  }

  stopListening() {
    // unsubscribe keypress
    document.removeEventListener('click', this.handleKey);
  }

  handleClick = ({ key }) => {
    const { index, makeChoice, turnTaken } = this.props;
    if(turnTaken) return;

    const selection = this.keys[key];
    console.log(this.keys);
    if(!selection) return;

    makeChoice(index, selection);
  };

  render() {
    const { index, zero, one, two, three, four, five, six, seven, eight, choice, winner } = this.props;

    let display;
    const turnTaken = !!choice;
    const hasWinner = winner !== null;
  
    if(hasWinner) {
      display = <div>{choice}</div>;
    }
    else {
      display = turnTaken 
        ? <div>{choice}</div>
        : <div className="board">
          <span className="box"><p>{zero} 0 </p></span>
          <span className="box"><p>{one} 1 </p></span>
          <span className="box"><p>{two} 2 </p></span>
          <span className="box"><p>{three} 3 </p></span>
          <span className="box"><p>{four} 4 </p></span>
          <span className="box"><p>{five} 5 </p></span>
          <span className="box"><p>{six} 6 </p></span>
          <span className="box"><p>{seven} 7 </p></span>
          <span className="box"><p>{eight} 8 </p></span>
        </div>;
    }
     
    return (
      <div className="player">
        <h3>Player {index + 1}</h3>
        {display}
        { hasWinner && <div>{winner === 3 ? 'TIE' : winner === index ? 'WON' : 'LOST'}</div> }
      </div>
    );
  }
}

export default connect(
  ({ selections, winner }, { index }) => ({
    choice: selections[index],
    winner
  }),
  { makeChoice }
)(Player);