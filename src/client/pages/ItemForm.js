import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ItemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null
  });
  
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If in edit mode, fetch the item data
    if (isEditMode) {
      const fetchItem = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/items/${id}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          
          const itemData = await response.json();
          
          setFormData({
            name: itemData.name,
            description: itemData.description,
            price: itemData.price,
            category: itemData.category,
            image: null
          });
          
          if (itemData.imageUrl) {
            setImagePreview(itemData.imageUrl);
          }
          
          setLoading(false);
        } catch (err) {
          console.error('Error fetching item:', err);
          setError('Failed to load item. Please try again later.');
          setLoading(false);
        }
      };
      
      fetchItem();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevData => ({
        ...prevData,
        image: file
      }));
      
      // Create a preview for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Create FormData to handle file upload
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('description', formData.description);
      submitData.append('price', formData.price);
      submitData.append('category', formData.category);
      
      if (formData.image) {
        submitData.append('image', formData.image);
      }
      
      const url = isEditMode ? `/api/items/${id}` : '/api/items';
      const method = isEditMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: submitData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }
      
      // Navigate back to the item list on success
      navigate('/items');
      
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(`Failed to ${isEditMode ? 'update' : 'create'} item: ${err.message}`);
      setLoading(false);
    }
  };

  if (isEditMode && loading) {
    return <div className="loading">Loading item data...</div>;
  }

  return (
    <div className="item-form-page">
      <div className="container">
        <h2>{isEditMode ? 'Edit Item' : 'Add New Item'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="item-form" encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter item name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter item description"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter item price"
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter item category"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/items')}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : (isEditMode ? 'Update Item' : 'Add Item')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
