
export default function Label( { htmlFor, children }) {
  return (
    <label htmlFor={ htmlFor } className="block mb-3 text-sm">
      { children }
    </label>
  )
}
