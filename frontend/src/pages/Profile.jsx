import React, { useContext, useEffect, useState } from 'react'
import ProfilePosts from '../components/ProfilePosts'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { URL } from '../url'

function Profile() {

  const { user } = useContext(UserContext)

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          URL + "/api/posts/user/" + user.id
        )

        setPosts(res.data)
      }
      catch (err) {
        console.log(err)
      }
    }

    if (user) {
      fetchPosts()
    }

  }, [user])

  return (
    <div>
      <div className='px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start'>

        {/* User Posts */}
        <div className='flex flex-col md:w-[70%] w-full'>
          <h1 className='text-xl font-bold mb-4'>Your Posts</h1>

          {posts.length > 0 ? (
            posts.map((post) => (
              <ProfilePosts
                key={post._id}
                post={post}
              />
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </div>

        {/* Profile Section */}
        <div className='flex justify-start md:justify-end md:sticky md:top-16 items-start md:w-[30%] md:items-end w-full'>

          <div className='flex flex-col space-y-4'>
            <h1 className='text-xl font-bold mb-4'>Profile</h1>

            <input
              className='outline-none px-4 py-2 text-gray-500 border'
              value={user?.username || ""}
              readOnly
              type='text'
            />

            <input
              className='outline-none px-4 py-2 text-gray-500 border'
              value={user?.email || ""}
              readOnly
              type='email'
            />

            <input
              className='outline-none px-4 py-2 text-gray-500 border'
              placeholder='new password'
              type='password'
            />

            <div className='flex items-center space-x-4 mt-8'>
              <button className='text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400'>
                Update
              </button>

              <button className='text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400'>
                Delete
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Profile