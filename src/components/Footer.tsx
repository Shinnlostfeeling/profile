import { profile } from "../data/profile";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-copy">
            © {currentYear} {profile.identity.nickname}.
          </p>
          <p className="footer-sub">
            Made to remember myself.
          </p>
        </div>

        <a href="#top" className="back-to-top">
          ↑ Back to top
        </a>
      </div>
    </footer>
  );
}
