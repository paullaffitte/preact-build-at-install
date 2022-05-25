import * as Preact from './vendor/preact.js';
import Button from './vendor/material-ui-button.js';
import Slider from './vendor/material-ui-slider.js';
import htm from './vendor/htm.js';
import { useState } from './vendor/preact-hooks.js';

const html = htm.bind(Preact.createElement);

const App = () => {
  const [count, setCount] = useState(0);
  return html`
    <${Button} onClick=${() => setCount(c => Math.max(0, c - 10))}>-</${Button}>
    <${Button} onClick=${() => setCount(c => Math.min(100, c + 10))}>+</${Button}>
    value: ${count}

    <${Slider} value=${count} onChange=${(e, value) => setCount(value)}/>
  `;
};

Preact.render(html`<${App}/>`, document.body)
