import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useUser } from "@clerk/clerk-react";

Modal.setAppElement("#root");

const ItemPage = () => {
  const { user } = useUser()
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: 0,
    currency: "crypto",
    clerkUserId: "", 
  });
    useEffect(() => {
      if (user) {
        setNewItem((prevItem) => ({
          ...prevItem,
          clerkUserId: user.id,
        }));
      }
    }, [user]);

  // Fetch all items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  // Handle input changes in the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const price = parseFloat(newItem.price);
  
    if (isNaN(price)) {
      console.error("Invalid price value");
      return; 
    }
    const updatedItem = {
      ...newItem,
      price: price,
    };
  
    try {
      console.log("this is being sent", updatedItem);
      const response = await axios.post("http://localhost:3000/api/v1/items", updatedItem);
      console.log(response.data.message);
      setItems((prevItems) => [...prevItems, response.data.item]); // Update the item list
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };
  

  return (
    <div>
      <h1>Items</h1>

      {/* List of items */}
      <ul>
        {items.map((item) => (
          <li key={item.itemId}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>
              Price: {item.price} {item.currency}
            </p>
            <p>Owner: {item.owner?.name || "Unknown"}</p>
          </li>
        ))}
      </ul>

      {/* Button to open the modal */}
      <button onClick={() => setIsModalOpen(true)}>Add Item</button>

      {/* Modal for adding a new item */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add Item Modal"
        style={{
          content: {
            maxWidth: "500px",
            margin: "auto",
            padding: "20px",
          },
        }}
      >
        <h2>Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={newItem.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={newItem.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Currency:</label>
            <select name="currency" value={newItem.currency} onChange={handleInputChange}>
              <option value="crypto">Crypto</option>
              <option value="USD">USD</option>
              <option value="INR">INR</option>
            </select>
          </div>
         
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default ItemPage;
