class Spoonarm extends HTMLElement {
  constructor() {
    super();
    this.html = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.html.innerHTML = `${buildStyle()}${buildMarkup(this.getAttribute('repo'))}`;
  }
}

function buildStyle(){
  return `<style>
  .b-spoonarm {
    display: inline-flex;
    align-items: center;
    background-image: linear-gradient(180deg, #F9F9F9 0%, #DFE3E8 100%);
    color: #333333;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;
    font-size: 11px;
    font-weight: bold;
    text-decoration: none;
    border-radius: 3px;
    border-width: 1px;
    border-style: solid;
    border-color: #C4CDD5;
    overflow: hidden;
  }
    
  .b-spoonarm > svg {
    margin-left: 5px;
  }

  .b-spoonarm-label {
    padding: 5px;
  }
</style>`;
}

function buildMarkup(repo){
  return `<a
  class="b-spoonarm"
  href="https://github.com/${repo}/stargazers"
  rel="noopener"
  target="_blank"
  aria-label="Star it on Github">
  <svg
    viewBox="0 0 16 16"
    width="14"
    height="14"
    aria-hidden="true">
    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
  </svg>
  <span class="b-spoonarm-label">Star</span>
</a>`;
}

customElements.define('b-spoonarm', Spoonarm);
