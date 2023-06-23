import React, { useEffect, useState } from 'react';

import { Card, FormField, Loader } from '../components';

// create a component to render the cards
const RenderCards = ({ data, title }) => {
  // if there is data, return the cards
  if (data?.length > 0) {
    // return the cards using the map function with post id as key
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }
// return a message if there is no data
  return (
    <h2 className="mt-5 font-bold text-[#000000] text-xl uppercase">{title}</h2>
  );
};
// create a component to render the home page
const Home = () => {
  // create a state to store the loading status
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  // create a state to store the search text
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);
  // create a function to fetch all the posts
  const fetchPosts = async () => {
    setLoading(true);
    // make a request to the server
    try {
      // send request to get posts
      const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // get response data
      // if the response is ok, set the posts
      if (response.ok) {
        // get response data
        const result = await response.json();
        // set the posts in reverse order to show the latest post first
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };
  // call the fetchPosts function when the component mounts
  useEffect(() => {
    // call the fetchPosts function
    fetchPosts();
  }, []);
  // create a function to handle the search
  const handleSearchChange = (e) => {
    // clear the timeout
    clearTimeout(searchTimeout);
    // set the search text
    setSearchText(e.target.value);
    // filter the posts
    setSearchTimeout(
      // set a timeout of 500ms to filter the posts
      setTimeout(() => {
        // filter the posts based on post name and prompt
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };
// return jsx
  return (
    // section to render the most popular generations
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Most Popular Generations</h1>
        <p className="mt-2 text-[#a1a5a9] text-[14px] max-w-[500px]">Enjoy a collection of imaginative and visually stunning art generated with the help of DALL-E AI API.</p>
      </div>
      {/* div for search */}
      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#69737d] text-xl mb-3">
                Showing Results for <span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title="No Posts Yet"
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
