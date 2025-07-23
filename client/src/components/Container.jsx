export default function Container({ children }) {
  return (
    <div className="w-screen">
      <div className="max-w-5xl mx-auto">{children}</div>
    </div>
  );
}
