class Pilc extends HTMLElement {
  constructor() {
    super();
    this.html = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.html.innerHTML = [
      buildStyle(),
      buildMarkup(this.getDefaultText(), this.getAttribute('data-style')),
    ].join('');
    this.getButton().addEventListener('click', () => {
      navigator.clipboard.writeText(this.getAttribute('data-text')).then(() => {
        this.setButtonText('Copied!');
        setTimeout(() => this.setButtonText(this.getDefaultText()), 1500);
      });
    });
  }
  setButtonText(text) {
    this.getButton().textContent = text;
  }
  getButton() {
    return this.html.querySelector('button');
  }
  getDefaultText(){
    return 'Copy';
  }
}

function buildStyle(){
  return `<style>
  .b-pilc {
    display: inline-block;
    padding: 11px;
    min-height: 40px;
    background-color: #DFE3E8;
    color: #627380;
    font-size: 0.875rem;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    line-height: 1rem;
    border: 1px solid #C4CDD5;
    border-radius: 4px;
    box-sizing: border-box;
    box-shadow: 0 0 0 #BFC4FF;
    transition-property: box-shadow, background-color;
    transition-duration: 200ms;
    transition-timing-function: ease-in-out;
    outline: 0;
    cursor: pointer;
    -webkit-appearance: none;
  }
  .b-pilc:hover {
    background-color: #F9F9F9;
  }
  .b-pilc:focus,
  .b-pilc:active {
    background-color: #F9F9F9;
    box-shadow: 0 0 0 4px #E6E8FF;
  }
</style>`;
}

function buildMarkup(text, style){
  const styleAttr = style ? `style="${style}"` : '';
  return `<button class="b-pilc" ${styleAttr}>${text}</button>`;
}

customElements.define('b-pilc', Pilc);
