import Header from "../../components/header/header";
export default function HomePage() {
   
    return (
        <>
          <Header/>

          <div className="w-full h-screen bg-blue-900 flex justify-center items-center flex-col">
            <div className="border border-gray-300 bg-white shadow-lg h-auto w-full max-w-xl rounded-lg p-6 flex flex-col space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 text-center">Book Your Ride</h2>
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Start Date"
                />
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="End Date"
                />
              </div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Luxury">Luxury</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
              </select>
              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              >
                Book Now
              </button>
            </div>
            <h1 className="text-white text-[50px]">
              Welcome to the Leonine Villa
              </h1>
          </div>
        </>
      );
}