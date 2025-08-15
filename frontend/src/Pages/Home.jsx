import React, { useEffect, useState } from 'react';
import { X, Trash2, Edit } from 'lucide-react';
import api_url from '../utils';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');
  const [note, setNote] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setTitle('');
    setTag('');
    setDescription('');
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !tag.trim() || !description.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const url = editingId 
        ? `${api_url}/api/note/update/${editingId}`
        : `${api_url}/api/note/create`;
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, tag, description }),
      });

      const data = await response.json();
      const { success, message, error } = data;

      if (success) {
        console.log(message);
        setIsOpen(false);
        handleReset();
        await fetchNote();
      } else {
        console.log('Error:', error);
        alert('Failed to save note');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNote = async () => {
    try {
      const url = `${api_url}/api/note/fetch`;
      const response = await fetch(url);
      const result = await response.json();
      const { success, message, error, notes } = result;
      
      if (success) {
        console.log(message, notes);
        setNote(notes || []);
      } else {
        console.log("Error fetching notes:", error);
        setNote([]);
      }
    } catch (error) {
      console.log("Error in fetch:", error.message);
      setNote([]);
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      const url = `${api_url}/api/note/delete/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
      });
      
      const result = await response.json();
      const { success, message, error } = result;
      
      if (success) {
        console.log(message);
        await fetchNote();
      } else {
        console.log(message, error);
        alert('Failed to delete note');
      }
    } catch (error) {
      console.log(error.message);
      alert('Network error occurred');
    }
  };

  const handleUpdate = (id, currentTitle, currentTag, currentDescription) => {
    setTitle(currentTitle);
    setTag(currentTag);
    setDescription(currentDescription);
    setEditingId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    handleReset();
  };

  return (
    <div className="bg-gray-900 min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-600 pb-6 mb-8">
          <h1 className="text-white text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">DevNotes</h1>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Add a Note
          </button>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {note.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12">
              <p className="text-lg">No notes yet. Create your first note!</p>
            </div>
          ) : (
            note.map((val) => (
              <div 
                key={val._id} 
                className="bg-gray-800 border border-gray-700 p-4 rounded-lg hover:border-blue-500 transition-colors duration-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {val.tag}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(val._id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                      aria-label="Delete note"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={() => handleUpdate(val._id, val.title, val.tag, val.description)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      aria-label="Edit note"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                </div>
                <h2 className="text-white text-xl font-semibold mb-2 line-clamp-2">
                  {val.title}
                </h2>
                <p className="text-gray-300 text-sm line-clamp-3">
                  {val.description}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingId ? 'Edit Note' : 'Add New Note'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Enter note title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-1">
                    Tag
                  </label>
                  <input
                    id="tag"
                    type="text"
                    placeholder="Enter tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row gap-3 px-6 py-4 border-t border-gray-200">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                {isLoading ? 'Saving...' : (editingId ? 'Update' : 'Create')}
              </button>
              <button
                onClick={handleReset}
                disabled={isLoading}
                className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;