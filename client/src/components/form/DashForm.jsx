import Logo from "../Logo";

export default function DashForm({ children, type }) {
  return (
    <div className="max-w-lg mx-auto mt-18">
      <div className="flex items-center pb-5 gap-2">
        <Logo />
        <h2 className="text-2xl">{type}</h2>
      </div>
      {children}
    </div>
  );
}
