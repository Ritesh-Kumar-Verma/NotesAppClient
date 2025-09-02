import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = ({ userDetails }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [notes, setNotes] = useState([]);


  const fetchNotes=()=>{
    axios
      .post(`${apiUrl}/getnotes`, userDetails)
      .then((res) => setNotes(res.data))
      .catch((error) => console.log(error));
  }


  useEffect(() => {
    if (!userDetails) return;
    fetchNotes()
    
  }, [userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDelete = (id)=>{

    for(const note of notes){
        if(note.id === id){
            const wrapper = {
      usersLoginDetails: userDetails,
      note: note
    };
    console.log(wrapper)

            axios.post(`${apiUrl}/deletenote`,wrapper)
            .then(res=>{
                console.log(res.data)
                fetchNotes()
            })
        }
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    const wrapper = {
      usersLoginDetails: userDetails,
      note: { ...formData, username: userDetails.username },
    };

    axios
      .post(`${apiUrl}/addnotes`, wrapper)
      .then((res) => {
        console.log(res.data);
        fetchNotes()
        setFormData({ title: "", content: "" });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen  text-white p-6">
        <button onClick={()=>{console.log(notes)}}>asd</button>
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {userDetails?.username} 👋
      </h1>

      <form
        className="flex flex-col gap-3 mb-6 bg-neutral-900 p-4 rounded-xl shadow-md"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          placeholder="Note Title"
          value={formData.title}
          name="title"
          className="px-3 py-2 rounded-lg bg-neutral-800 outline-none focus:ring-2 focus:ring-fuchsia-700"
          onChange={handleChange}
        />
        <textarea
          placeholder="Write your note..."
          rows="3"
          name="content"
          value={formData.content}
          className="px-3 py-2 rounded-lg bg-neutral-800 outline-none focus:ring-2 focus:ring-fuchsia-700 resize-none"
          onChange={handleChange}
        ></textarea>
        <button
          type="submit"
          className="self-end px-5 py-2 rounded-lg bg-fuchsia-700 hover:bg-fuchsia-800 transition font-medium"
        >
          Add Note
        </button>
      </form>

      {notes.length === 0 ? (
        <p className="text-neutral-400">No notes yet. Add your first one!</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-neutral-900 rounded-xl p-4 shadow-md hover:shadow-lg transition relative"
            >
              <button
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-600 hover:bg-red-500 text-white rounded-full text-sm font-bold"
                onClick={() => {
                    
                    handleDelete(note.id)
                }}
              >
                X
              </button>

              <p className="text-base">{note.title}</p>
              <p className="text-sm text-neutral-500 mt-2">{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
