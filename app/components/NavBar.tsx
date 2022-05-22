import Button from "~/components/Button";

export default function NavBar() {
  return (
    <nav className="z-50 w-full fixed top-0 flex justify-center bg-opacity-90 backdrop-blur-xl backdrop-saturate-150 bg-background-primary-light dark:bg-background-primary-dark py-1">
      <Button to="/">Yatsuk.me</Button>
    </nav>
  );
}
