import React from 'react';

import './glyph.png';
import './mandaic-keyboard.scss';

/**
* Mandaic alphabet
*/
const firstCodeUnit = 0x0840;

const letters = [
  'HALQA', 'AB', 'AG', 'AD', 'AH',
  'USHENNA', 'AZ', 'IT', 'ATT', 'AKSA',
  'AK', 'AL', 'AM', 'AN', 'AS',
  'IN', 'AP', 'ASZ', 'AQ', 'AR',
  'ASH', 'AT', 'DUSHENNA', 'KAD', 'AIN'];

type LetterProps = {
  name: string;
  click: () => void;
}

function Letter(props: LetterProps) {
  return (
    <button onClick={props.click} >{props.name}</button>
  );
}

type OutputProps = {
  input: number[];
  reverse?: boolean;
}

type OutputState = {
  tooltip: string;
}

class Output extends React.Component<OutputProps, OutputState> {
  inputRef: React.RefObject<HTMLInputElement>;
  
  constructor(props: OutputProps) {
    super(props);
    this.state = {
      tooltip: 'Copy to clipboard'
    };

    this.inputRef = React.createRef();
  }

  onMouseOut = () => {
    this.setState({ tooltip: 'Copy to clipboard' });
  };

  onClick = () => {
    const el = this.inputRef.current;
    if (el) {
      el.select();
      el.setSelectionRange(0, 99999);
      document.execCommand('copy');
      this.setState({ tooltip: 'Copied: ' + el.value });
    }
  }

  render() {
    const props = this.props;
    const state = this.state;

    const glyphs = props.input.map((index, key) => <span key={key} title={letters[index]} className={'glyph ' + letters[index]}></span>);
    if (props.reverse) {
      glyphs.reverse();
    }
    return (
      <div>
        <div>
          {glyphs}
        </div>
        <input
          type="text"
          ref={ this.inputRef }
          value={ props.input.reduce((acc, val) => acc + String.fromCharCode(firstCodeUnit + val), '') }
        ></input>
        <div className="tooltip">
          <button
            disabled={props.input.length <= 0}
            onClick={this.onClick}
            onMouseOut={this.onMouseOut}
          >
            <span className="tooltiptext">{state.tooltip}</span>
            Copy text
          </button>
        </div>
      </div>
    );
  }

}

type MandaicKeyboardProps = {

};

type MandaicKeyboardState = {
  input: number[];
};

export class MandaicKeyboard extends React.Component<MandaicKeyboardProps, MandaicKeyboardState> {
  buttons: JSX.Element[];

  constructor(props: MandaicKeyboardProps) {
    super(props);
    this.state = {
      input: []
    };
    this.buttons = letters.map((name, index) =>
      <Letter name={name} key={name} click={ () => {
        this.setState({
          input: [...this.state.input, index]
        });
      }}
      />
    );
  }

  clearInput = () => {
    this.setState({ input: []});
  }

  render() {
    return (
      <div>
        {this.buttons}
        <Output input={this.state.input} reverse={true}/>
        <button onClick={this.clearInput}>Clear</button>
      </div>
    );
  }
}
