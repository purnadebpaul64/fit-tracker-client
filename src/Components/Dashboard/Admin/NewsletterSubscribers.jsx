import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const NewsletterSubscribers = () => {
  const { user } = useAuth();
  const token = user?.accessToken;
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch subscribers
  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/newsletter`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubscribers(response.data);
    } catch (error) {
      toast.error("Failed to fetch subscribers");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <section className="w-full lg:w-10/12 mx-auto py-8">
      <Helmet>
        <title>Newsletter Subscribers</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 text-center">
        Newsletter Subscribers
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading subscribers...</p>
      ) : subscribers.length === 0 ? (
        <p className="text-center text-gray-600">No subscribers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 rounded-md overflow-hidden">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Subscribed At</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map(({ _id, name, email, createdAt }, index) => (
                <tr
                  key={_id}
                  className={
                    index % 2 === 0
                      ? "bg-gray-900 text-white"
                      : "bg-gray-800 text-white"
                  }
                >
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{name}</td>
                  <td className="px-6 py-3">{email}</td>
                  <td className="px-6 py-3">
                    {new Date(createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default NewsletterSubscribers;
