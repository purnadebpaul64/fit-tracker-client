import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import useUsers from "../../../Hooks/useUsers";
import { Helmet } from "react-helmet-async";

const AddForumForm = () => {
  const { user } = useAuth();
  const token = user?.accessToken;
  const { users = [], isLoading, isError } = useUsers();
  const [dbUser, setDbUser] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (user?.email && users.length > 0) {
      const matchedUser = users.find((u) => u.email === user.email);
      setDbUser(matchedUser);
    }
  }, [user, users]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !dbUser) {
      toast.error("User information is not available");
      return;
    }

    const forum = {
      title,
      content,
      creator: {
        id: dbUser._id,
        name: user.displayName,
        role: dbUser.role,
        email: user.email,
        image: user.photoURL,
      },
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/forums`, forum, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Forum posted!");
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to post forum");
    }
  };

  return (
    <section className="p-8 border border-black rounded-2xl w-full sm:w-8/12 mx-auto mt-5">
      <Helmet>
        <title>Add New Forum</title>
      </Helmet>
      <h2 className="text-2xl font-semibold mb-4">Add a New Slot</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post..."
          className="w-full p-2 border"
          rows={5}
          required
        ></textarea>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Post
        </button>
      </form>
    </section>
  );
};

export default AddForumForm;
