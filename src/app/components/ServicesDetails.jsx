import dbConnect, { collectionNameaObj } from "@/lib/db.Connect";
import { ObjectId } from "mongodb";

export default async function ServicesDetails({ params }) {
  try {
    const collection = await dbConnect(collectionNameaObj); // Corrected usage

    const service = await collection.findOne({ _id: new ObjectId(params.id) }); // Fixed ObjectId conversion

    if (!service) {
      return <div>Service not found</div>;
    }

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">{service.title}</h1>
        <p className="text-gray-600">${service.price}</p>
        <img
          src={service.img}
          alt={service.title}
          className="w-full h-64 object-cover mt-4"
        />
        <p className="text-gray-800 mt-4">{service.description}</p>
      </div>
    );
  } catch (error) {
    console.error("Error fetching service details:", error);
    return <div>Failed to load service details. Please try again later.</div>;
  }
}
