export default function Footer() {
  const madeWithLinks: {
    url: string;
    label: string;
    logoUrl: string;
  }[] = [
    {
      url: "",
      label: "Love",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Love_Heart_symbol.svg/2250px-Love_Heart_symbol.svg.png",
    },
    {
      url: "https://remix.run",
      label: "Remix",
      logoUrl: "https://avatars.githubusercontent.com/u/64235328?s=200&v=4",
    },
    {
      url: "https://tailwindcss.com",
      label: "Tailwind CSS",
      logoUrl:
        "https://seeklogo.com/images/T/tailwind-css-logo-5AD4175897-seeklogo.com.png",
    },
  ];

  return (
    <footer className="flex flex-col justify-center items-center py-6 px-3 bg-background-third-light dark:bg-background-third-dark">
      <nav className="flex flex-wrap justify-center items-baseline">
        <span className="text-caption">Made with: </span>
        {madeWithLinks.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center px-1.5"
          >
            <span className="pr-1 text-caption flex-grow">{link.label}</span>
            <img
              height={"20"}
              width={"20"}
              src={link.logoUrl}
              alt={link.label}
            />
          </a>
        ))}
      </nav>
    </footer>
  );
}
