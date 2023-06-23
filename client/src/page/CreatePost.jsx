import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

// create post page
const CreatePost = () => {
  // to go back to home page
  const navigate = useNavigate();
  // form state
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  // to show loader while generating image
  const [generatingImg, setGeneratingImg] = useState(false);
  // to show loader while submitting form
  const [loading, setLoading] = useState(false);
  // to handle form change
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  // to handle surprise me button
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  // to generate image
  const generateImage = async () => {
    // check if prompt is provided
    if (form.prompt) {
      // show loader
      try {
        setGeneratingImg(true);
        // send request to generate image
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          // header for json data
          headers: {
            'Content-Type': 'application/json',
          },
          // body with prompt to json from string prompt
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });
        // get image data
        const data = await response.json();
        // set image data in form
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };
  // to handle form submit
  const handleSubmit = async (e) => {
    // prevent default form submission
    e.preventDefault();
    // check if form is valid
    if (form.prompt && form.photo) {
      // show loader
      setLoading(true);
      try {
        // send request to create post
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          // header for json data
          headers: {
            'Content-Type': 'application/json',
          },
          // body with form data to json from string
          body: JSON.stringify({ ...form }),
        });
        // get response data
        await response.json();
        alert('Success');
        // go to home page to see post
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };
  // return jsx
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Imagine</h1>
        <p className="mt-2 text-[#a1a5a9] text-[14px] max-w-[500px]">Prompt an endless possibilities with the DALL-E AI and share it with the world.</p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Enter Your Name"
            type="text"
            name="name"
            placeholder="Ex., Syed Khizar"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Enter Your Prompt"
            type="text"
            name="prompt"
            placeholder="A Loin roaring in a battlefield…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-blue-600 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Processing...' : 'Process'}
          </button>
        </div>
        
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">** Let the world see your art **</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#666ade] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share your masterpiece'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;