
export default function AuthArea( { children } ) {
  return (
    <div className="bg-gray-50 h-screen w-screen flex items-center justify-center">
        <div className="w-[640px] mx-auto border-1 border-gray-300 p-10">
            {children}
        </div>
    </div>
  )
}
