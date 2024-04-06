// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';

function DeleteCustomerForm() {
  const [customerId, setCustomerId] = useState('');

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/customers/${customerId}`);
      alert('Customer deleted successfully.');
      setCustomerId(''); // Reset the input field after deletion
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div>
      <input
        type="number"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        placeholder="Customer ID"
      />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteCustomerForm;
