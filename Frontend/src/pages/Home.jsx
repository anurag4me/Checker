import React, { useState } from "react";

function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      console.log("Server Response:", data);
    } catch (err) {
      console.error("Error submitting form", err);
    }

    setName("");
    setEmail("");
  };

  return (
    <div className="w-full h-screen">
      <h1>Welcome to Home page</h1>

      <form className="max-w-sm mx-auto" method="post" onSubmit={handleSubmit}>
        <div className="mb-5">
          <input
            type="name"
            id="name"
            className="px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg "
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            id="email"
            className="px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg "
            placeholder="name@flowbite.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2 text-white bg-blue-700 rounded-xl"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Home;
