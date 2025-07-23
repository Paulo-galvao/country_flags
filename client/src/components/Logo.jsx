import { Link } from "react-router";

export default function Logo() {
  return (
    <div className="">
      <Link to={"/"}>
        <img className="h-8 cursor-pointer" src="/flag.png" alt="flag" />
      </Link>
    </div>
  );
}
