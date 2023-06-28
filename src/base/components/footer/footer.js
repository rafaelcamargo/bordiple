import './footer.styl';

export const Footer = () => {
  return (
    <footer className="b-footer" id="footer">
      <div className="b-footer-ph-wrapper">
        <a
          href="https://www.producthunt.com/posts/bordiple?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-bordiple"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=401268&theme=light"
            alt="Bordiple - CSS&#0032;Multiple&#0032;Borders&#0032;Generator | Product Hunt"
            style={{width: '250px', height: '54px'}} width="250" height="54"
          />
        </a>
      </div>
      <p>
        Bordiple is a project carefully made
        by <a href="https://rafaelcamargo.com/?utm_source=bordiple">
          Rafael Camargo
        </a>.
      </p>
    </footer>
  );
};
