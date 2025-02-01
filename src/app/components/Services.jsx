import dbConnect, { collectionNameaObj } from "@/lib/db.Connect";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default async function Services() {
  try {
    const collection = await dbConnect(collectionNameaObj);
    const data = await collection.find({}).toArray();

    return (
      <div>
        <div className="grid grid-cols-12 gap-4">
          {data.map((item) => (
            <div
              key={item._id.toString()} 
              className="col-span-2 p-4 border rounded-lg shadow-md"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h2 className="text-xl font-bold mt-2">{item.title}</h2>
              <p className="text-gray-600">${item.price}</p>

              <div className="mt-4">
                <Link href={`/services/${item._id}`}>
                  <FaArrowRight className="text-blue-500 hover:text-blue-700" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    return (
      <div className="text-red-500 text-center p-4">
        <p>Failed to load services. Please try again later.</p>
      </div>
    );
  }
}