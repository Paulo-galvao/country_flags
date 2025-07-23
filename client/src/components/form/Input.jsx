
export default function Input( { type, name, id, onChange, value }) {
  return (
    <>
        <input value={value} id={id} onChange={onChange} type={type} name={name} required className="border-1 mb-3 border-gray-400 rounded-sm w-full h-10 outline-0 focus:border-blue-600 focus:border-2 text-gray-700"  />  
    </>
  )
}
