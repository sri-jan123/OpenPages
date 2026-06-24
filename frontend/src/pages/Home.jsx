import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import HomePosts from '../components/HomePosts';
import Loader from '../components/Loader';
import { UserContext } from '../context/UserContext';
const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const { search } = useLocation();

  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);

  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);

    try {
      const res = await axios.get(`${API_URL}/api/posts${search}`);

      setPosts(res.data);
      setNoResults(res.data.length === 0);
    } catch (err) {
      console.log(err);
      setNoResults(true);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <div className="px-8 md:px-[200px] min-h-[80vh]">
      {loader ? (
        <div className="h-[40vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : !noResults ? (
        posts.map((post) => (
          <Link
            key={post._id}
            to={user ? `/posts/post/${post._id}` : "/login"}
            className="block"
          >
            <HomePosts post={post} />
          </Link>
        ))
      ) : (
        <h3 className="text-center font-bold mt-16">
          No Posts available
        </h3>
      )}
    </div>
  );
}

export default Home;