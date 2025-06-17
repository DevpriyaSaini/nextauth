"use client"

function page({params}:any) {
  return (
   <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
  <h1 className="text-3xl font-bold text-gray-800 mb-4">Profile Page</h1>
  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
    <h2 className="text-xl font-semibold text-gray-700">
      User ID: <span className="text-blue-600">{params.id}</span>
    </h2>
  </div>
</div>
  )
}

export default page