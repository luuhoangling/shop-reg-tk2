import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/items');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Failed to load items. Please try again later.');
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`/api/items/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Remove the deleted item from the state
        setItems(items.filter(item => item._id !== id));
      } catch (err) {
        console.error('Error deleting item:', err);
        alert('Failed to delete item. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading items...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="item-list-page">
      <div className="container">
        <div className="header-actions">
          <h2>Item List</h2>
          <Link to="/items/add" className="btn btn-primary">Add New Item</Link>
        </div>
        
        {items.length === 0 ? (
          <div className="no-items">
            <p>No items found. Start by adding some items.</p>
          </div>
        ) : (
          <div className="items-grid">
            {items.map(item => (
              <div key={item._id} className="item-card">
                {item.imageUrl && (
                  <div className="item-image">
                    <img src={item.imageUrl} alt={item.name} />
                  </div>
                )}
                <div className="item-content">
                  <h3>{item.name}</h3>
                  <p className="item-category">{item.category}</p>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                  <p className="item-description">{item.description}</p>
                  <div className="item-actions">
                    <Link to={`/items/edit/${item._id}`} className="btn btn-sm btn-edit">Edit</Link>
                    <button 
                      onClick={() => handleDelete(item._id)} 
                      className="btn btn-sm btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemList;
