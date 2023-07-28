import './footer.styl';

export const Footer = () => {
  return (
    <footer className="b-footer" id="footer">
      <p>
        Bordiple is a project carefully made
        by <a href="https://rafaelcamargo.com/?utm_source=bordiple">
          Rafael Camargo
        </a>. This website doesn’t use cookies, and 
        its <a href="https://plausible.io/bordiple.rafaelcamargo.com?period=30d" rel="noopener noreferrer" target="_blank">
        analytics</a> are public.
      </p>
    </footer>
  );
};
