import axios from "axios";

// upload image and return image url
export const imageUpload = async (imageData) => {
  try {
    const imageFormData = new FormData();
    imageFormData.append("image", imageData);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      imageFormData
    );
    return data?.data?.display_url;
  } catch (error) {
    console.error("Image upload failed:", error);
    return null;
  }
};

export const saveUserInDb = async (user) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/users`,
    user
  );
};

export const getAllTrainers = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/trainers`);
  return data;
};
export const getAllForums = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/get-forums`
  );
  return data;
};
export const getAllUsers = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/get-users`);
  return data;
};
