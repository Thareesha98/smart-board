import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSave, FaUpload, FaUser } from 'react-icons/fa';

const galleryAvatars = [
  'https://randomuser.me/api/portraits/women/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/women/26.jpg',
];

const ChangeAvatarModal = ({ isOpen, onClose, currentAvatar, onSubmit }) => {
  const [previewAvatar, setPreviewAvatar] = useState(currentAvatar);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    // ... validation ...
    setSelectedFile(file); // <--- SAVE THE FILE
    const reader = new FileReader();
    reader.onload = (e) => setPreviewAvatar(e.target.result);
    reader.readAsDataURL(file);
  }
};

  const handleSave = () => {
   // If a file was uploaded, send the file. If gallery selected, send the URL string.
   if (selectedFile) {
      onSubmit(selectedFile); 
   } else {
      onSubmit(previewAvatar);
   }
};

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[2000] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card-bg rounded-large shadow-2xl w-full max-w-md"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-2xl font-bold text-primary">Change Profile Picture</h3>
              <button onClick={onClose} className="text-text-muted hover:text-text-dark">
                <FaTimes size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex justify-center">
                <img
                  src={previewAvatar}
                  alt="Preview"
                  className="w-40 h-40 rounded-full object-cover border-4 border-accent"
                />
              </div>

              <div className="flex flex-col gap-3">
                <input
                  type="file"
                  id="avatarUpload"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  onClick={() => document.getElementById('avatarUpload').click()}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-large font-semibold bg-background-light text-text-dark hover:bg-accent hover:text-white transition-all duration-300"
                >
                  <FaUpload />
                  Upload New Photo
                </button>
                <button
                  onClick={() => setPreviewAvatar('https://randomuser.me/api/portraits/women/32.jpg')}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-large font-semibold bg-background-light text-text-dark hover:bg-accent hover:text-white transition-all duration-300"
                >
                  <FaUser />
                  Use Default Avatar
                </button>
              </div>

              <div>
                <h4 className="text-center font-semibold text-text-dark mb-4">Choose from Gallery</h4>
                <div className="grid grid-cols-4 gap-3">
                  {galleryAvatars.map((avatar, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPreviewAvatar(avatar)}
                      className="cursor-pointer rounded-full overflow-hidden border-3 border-transparent hover:border-accent transition-all duration-200"
                    >
                      <img src={avatar} alt={`Avatar ${index + 1}`} className="w-full h-20 object-cover" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 justify-end pt-4 border-t border-gray-100">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-large font-semibold border-2 border-text-muted text-text-muted hover:bg-text-muted hover:text-white transition-all duration-300"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 rounded-large font-semibold bg-accent text-white hover:bg-primary transition-all duration-300 shadow-lg"
                >
                  <FaSave />
                  Save Avatar
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChangeAvatarModal;