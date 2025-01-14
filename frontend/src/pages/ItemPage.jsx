import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import Card from "../components/ItemCard";
import Form from "../components/Form";

const ItemPage = () => {
  const { user } = useUser();
  const [items, setItems] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Fetch all items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/items");
        setItems(response.data || []);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleItemAdded = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-10 px-6">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
          Your Items
        </h1>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.length > 0 ? (
            items.map((item) => (
              <Card
                key={item.itemId || item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                currency={item.currency}
                owner={item.owner?.name || "Unknown"}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No items available. Add one now!
            </p>
          )}
        </div>

        {/* Add Item Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Modal for Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            {/* Form Component */}
            <Form
              isOpen={isFormOpen}
              onClose={() => setIsFormOpen(false)}
              onItemAdded={handleItemAdded}
              userId={user?.id || ""}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemPage;
