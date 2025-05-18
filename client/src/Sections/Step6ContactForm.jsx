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


  // Set base URL and enable credentials
  axios.defaults.baseURL = 'http://127.0.0.1:8000';
  axios.defaults.withCredentials = true;

  // Function to get CSRF token from cookies
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  // Function to submit feedback
  const handleSubmit = async (e, feedbackData) => {
    e.preventDefault();
    // Fetch CSRF cookie
    await axios.get('/sanctum/csrf-cookie');

    // Get CSRF token from cookies
    const csrfToken = getCookie('XSRF-TOKEN');

    // Send POST request with CSRF token in headers
    await axios.post('/api/feedback', {
      name: formData.name,
      email: formData.email,
      message: formData.message
    }, {
      headers: {
        'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
      },
    }).then(response => {
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      setSubmitted(true);
      Toast('Data submitted successfully!', '✅', 'top-center');
    })
      .catch(error => Toast(`Submission failed: ${error.message}`, '❌', 'top-center'))
      .finally(() => setLoading(false))


  };



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  // await axios.post('http://127.0.0.1:8000/api/feedback', {
  //   name: formData.name,
  //   email: formData.email,
  //   message: formData.message
  // }, {
  //     withCredentials: true,
  //     withXSRFToken: true,
  //     headers: {
  //       // 'Content-Type': 'application/json',
  //       'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
  //     }
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`Server error: ${response.statusText}`);
  //       }
  //       setSubmitted(true);
  //       Toast('Data submitted successfully!', '✅', 'top-center');
  //     })
  //     .catch(error => Toast(`Submission failed: ${error.message}`, '❌', 'top-center'))
  //     .finally(() => setLoading(false))

  // };

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
