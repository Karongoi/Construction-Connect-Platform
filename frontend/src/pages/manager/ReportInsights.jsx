import { useState } from "react";

function ReportInsights() {
  const [form, setForm] = useState({ title: "", content: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send to backend here if desired
      console.log("Submitting Report:", form);
      alert("Report submitted!");
      setForm({ title: "", content: "" });
    } catch (err) {
      alert("Submission failed.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Manager Reports & Insights</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Report Title"
          required
          className="w-full p-3 border rounded"
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Write your report or insights here..."
          rows={6}
          required
          className="w-full p-3 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}

export default ReportInsights;
