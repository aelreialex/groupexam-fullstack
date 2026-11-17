import logo from "../../assets/images/Logo.svg";

export function Footer() {
  return (
    <footer
      className={`
        w-full border-t border-border-strong
        bg-bg-footer text-text-on-dark
      `}
    >
      <div
        className={`
          mx-auto flex max-w-6xl flex-col justify-between gap-6
          px-4 py-2 sm:flex-row sm:items-center
        `}
      >
        <img src={logo} alt="Nisses Korvmoj" className="w-32" />

        <p className="font-kalam text-sm italic">
          “Stäng dörren efter dig. Det finns ingen dörr, men ändå.”
        </p>

        <span
          className={`
            flex items-center gap-2 text-xs font-semibold
            sm:justify-end
          `}
        >
          <p>STORATORGET</p>
          <aside className="inline-block h-1 w-1 rounded-full bg-text-on-dark" />
          <p>SEDAN ALLTID</p>
        </span>
      </div>
    </footer>
  );
}
