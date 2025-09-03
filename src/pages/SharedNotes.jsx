import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SharedNotes = () => {
  const { shareId } = useParams(); 
  const frontend_url = import.meta.env.VITE_FRONTEND_URL;
  

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shareId) return;

  
    axios
      .get(`${frontend_url}/getsharednote/${shareId}`)
      .then((res) => {
        setNote(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("This note could not be found or is no longer shared.");
        setLoading(false);
      });
  }, [shareId]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white ">
        <p className="text-neutral-400 text-lg">Loading shared note...</p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white ">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-white p-6 flex items-center justify-center">
      <div className="bg-neutral-900 rounded-xl p-6 shadow-md hover:shadow-lg transition w-full max-w-lg relative">
        

        <div className="absolute top-3 right-3 bg-fuchsia-700 text-white px-3 py-1 rounded-full text-xs font-medium">
          Shared Note
        </div>

        <h1 className="text-2xl font-bold text-fuchsia-500 mb-4">
          {note.title}
        </h1>

        <p className="text-base text-neutral-200 whitespace-pre-wrap mb-6">
          {note.content}
        </p>

        <div className="border-t  pt-3">
          <p className="text-sm text-neutral-400">
            <span className="font-medium text-neutral-300">Shared by:</span>{" "}
            {note.sharedBy}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SharedNotes;
