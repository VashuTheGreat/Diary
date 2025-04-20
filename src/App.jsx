import React, { useEffect, useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from './components/Footer';

import Navbar from './components/Navbar';

export default function App() {
  const [entry, setEntry] = useState('');
  const [diary, setDiary] = useState(() => {
    const savedDiary = localStorage.getItem('diary');
    try {
      return savedDiary ? JSON.parse(savedDiary) : [];
    } catch (error) {
      console.error("Error", error);
      return [];
    }
  });

  const [airesponse, setAiResponse] = useState('Hello! I am your AI assistant. Create Your Thoughts With Me!');
  const [userInput, setUserInput] = useState('');
  const [hidden, sethidden] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      text: entry,
      date: new Date().toLocaleString(),
    };
    const updatedDiary = [newEntry, ...diary];
    setDiary(updatedDiary);
    setEntry('');
  };

  const handleEdit = (index) => {
    const newText = prompt('Edit your entry:', diary[index].text);
    if (newText) {
      const updatedDiary = [...diary];
      updatedDiary[index].text = newText;
      setDiary(updatedDiary);
    }
  };

  const handleDelete = (index) => {
    const updatedDiary = diary.filter((_, i) => i !== index);
    setDiary(updatedDiary);
  };

  const generateResponse = async (userInput) => {
    const API_KEY = "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";
    const url = "https://openrouter.ai/api/v1/chat/completions";

    const payload = {
      model: "openai/gpt-3.5-turbo-0613",
      messages: [
        {
          role: "system",
          content: `You are a thoughtful assistant who expresses feelings and ideas in the form of short, creative diary-like thoughts or quotes (1-2 lines only). Keep it poetic, emotional, or deep. No long paragraphs.`,
        },
        {
          role: "user",
          content: userInput,
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data.choices[0]?.message?.content || "⚠️ No response from AI.";
  };

  useEffect(() => {
    localStorage.setItem('diary', JSON.stringify(diary));
  }, [diary]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-3xl font-bold mb-4 text-center text-purple-800">My Personal Diary</h1>
          <img className="w-8" src="./Book.gif" alt="Book" />

          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full p-3 border rounded-lg mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="4"
              placeholder="Write your thoughts..."
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 rounded-lg transition"
            >
              Add Entry
            </button>
          </form>

          {!hidden && (
            <div id="ai" className="w-1/4 min-h-[50vh] max-h-[90vh] bg-gray-200 fixed top-40 right-10 p-4 rounded-lg text-black overflow-auto max-sm:bottom-0 max-sm:h-1/5 max-sm:w-1/2">
              <div id="ai-response" className="mb-2">
                {airesponse}
              </div>
              <img src="./robot.gif" alt="robo" className="w-8" />
              <input
                type="text"
                placeholder="Enter your question"
                id="ai-input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full p-2 border rounded absolute bottom-0 left-0 right-0 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                id="ai-button"
                onClick={async () => {
                  try {
                    const reply = await generateResponse(userInput);
                    setAiResponse(reply);
                  } catch (err) {
                    console.error("Failed to get response:", err);
                    setAiResponse("⚠️ Something went wrong!");
                  } finally {
                    setUserInput('');
                  }
                }}
                className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-lg transition absolute bottom-0 right-0"
              >
                Send
              </button>
            </div>
          )}

          <div className="mt-6 space-y-4 h-96 overflow-y-auto">
            {diary.length === 0 ? (
              <p className="text-center text-gray-500">No entries yet.</p>
            ) : (
              diary.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg shadow flex justify-between items-start border-l-4 border-l-purple-500"
                >
                  <div>
                    <p className="text-gray-800">{item.text}</p>
                    <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                  </div>
                  <div className="flex gap-2 ml-4 items-center">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-purple-700 hover:text-purple-900"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Floating AI Robot Button */}

      {hidden && (
  <div className="fixed bottom-28 right-6 bg-white shadow-lg p-4 rounded-lg border border-purple-300 max-w-xs z-40">
    <p className="text-gray-800 font-semibold">🤖 Hello! How can I help you?</p>
  </div>
)}

<div
  className="aii fixed bottom-10 right-5 w-14 h-14 cursor-pointer z-50"
  onClick={() => sethidden(!hidden)}
>
  <img src="./robot.gif" alt="AI Robot" className="w-full h-full object-contain" />
</div>


<Footer/>
    </>
  );
}
