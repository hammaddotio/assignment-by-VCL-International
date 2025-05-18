import React, { useState } from 'react';
import Toast from '../Components/Toast';
import Button from '../Components/Button';
import axios from 'axios';

const Step6ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const csrfResponse = await axios.get('/sanctum/csrf-cookie', { withCredentials: true });

      const csrfToken = csrfResponse.data.token;

      if (!csrfToken) {
        throw new Error('CSRF token not found.');
      }

      const response = await axios.post('/api/feedbacks', {
        name: formData.name,
        email: formData.email,
        message: formData.message
      }, {
        headers: {
          'X-XSRF-TOKEN': csrfToken,
        },
      });

      setSubmitted(true);
      Toast('Data submitted successfully!', '✅', 'top-center');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Toast(`Submission failed: ${error.message}`, '❌', 'top-center');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-4">Contact Form with Feedback</h2>
      <p className="text-gray-800 mb-4">
        In React, you can create a controlled form using the <code>useState</code> hook to manage form inputs. By adding a textarea for feedback alongside fields for name and email, you can capture comprehensive user input. Upon submission, you can process this data as needed, such as sending it to an API or storing it locally.
      </p>
      {submitted ? (
        <p className="text-green-600">Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 mb-2">
              Feedback:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              rows="4"
              required
              disabled={loading}
            ></textarea>
          </div>

          <Button label={loading ? 'Submitting...' : 'Submit'} type="submit" disabled={loading} />
        </form>
      )}
    </div>
  );
};

export default Step6ContactForm;
