export default function Button( {children} ) {
  return (
    <button
      className="w-full h-10 rounded-xl cursor-pointer bg-black text-white my-4"
      type="submit"
    >
        { children }
    </button>
  );
}
