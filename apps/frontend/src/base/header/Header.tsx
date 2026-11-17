import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo.svg";

export function Header() {
  return (
    <header className="w-full border-b border-border-strong">
      <div className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-4 p-4 sm:grid-cols-3">
        <img src={logo} alt="Nisses Korvmoj" className="w-32" />

        <div className="col-start-2 flex justify-end sm:col-start-3">
          <button>Placeholder</button>
        </div>

        <nav
          className="
            col-span-2 flex items-center gap-6 sm:col-span-1 
            sm:col-start-2 sm:row-start-1 sm:justify-center
          "
        >
          <Link to="/menu">Meny</Link>
          <Link to="/">Hem</Link>
        </nav>
      </div>
    </header>
  );
}
