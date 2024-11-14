import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState(null);

  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const isLoggedIn = user && user.uid;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This is where you'd typically send the data to an API endpoint
    // We'll just simulate a success response here.
    setSubmitStatus("Thank you for contacting us! We will get back to you soon.");
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  // Remove forced login checks. If you want to limit contact form usage
  // to logged-in users, keep `isLoggedIn` check and navigate to login.

  return (
    <footer id="contact-developer" className="bg-black text-white p-8 mt-8">
      <h2 className="text-2xl mb-4">Contact Developer</h2>
      <form onSubmit={handleSubmit} className="flex flex-col max-w-md">
        {submitStatus && <p className="mb-4 text-green-500">{submitStatus}</p>}
        <label className="mb-2">
          Name:
          <input
            className="w-full p-2 mt-1 bg-gray-700 rounded"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className="mb-2">
          Email:
          <input
            className="w-full p-2 mt-1 bg-gray-700 rounded"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className="mb-2">
          Message:
          <textarea
            className="w-full p-2 mt-1 bg-gray-700 rounded"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows="5"
          ></textarea>
        </label>
        <button
          className="mt-4 p-2 bg-red-700 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </footer>
  );
};

export default Footer;
