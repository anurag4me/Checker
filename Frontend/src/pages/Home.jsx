import React, { useState } from "react";
import DragComponent from "../components/DragComponent";

function Home() {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("answer", file);

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/uploads`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Server Response:", data);
    } catch (err) {
      console.error("Error submitting form", err);
    }
    
    setFile(null);
  };

  return (
    <div className="w-full h-screen bg-amber-200">
      <form className="flex flex-col h-screen justify-center items-center" method="post" onSubmit={handleSubmit} encType="multipart/form-data" >
        <DragComponent onChange={(file) => setFile(file)} />
        <button type="submit" className="mt-5 w-134 px-5 py-2 text-white bg-black rounded-xl cursor-pointer" >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Home;
