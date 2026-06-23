import React from 'react'

function ProfilePosts() {
  return (
    <div className="w-full flex mt-8 space-x-4">
    {/* left */}
    <div className="w-[35%] h-[200px] flex justify-center items-center">
    <img src='https://cdn.mos.cms.futurecdn.net/VFLt5vHV7aCoLrLGjP9Qwm-1200-80.jpg' alt="" className="h-full w-full object-cover"/>
    </div>
    {/* right */}
    <div className="flex flex-col w-[65%]">
      <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
        10 uses of artificial intelligence
      </h1>
      <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
       <p>@srijantripathi</p>
       <div className="flex space-x-2 text-sm">
       <p>10/10/24</p>
       <p>16:54</p>
       </div>
      </div>
      <p className="text-sm md:text-lg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus assumenda quos optio amet repellendus impedit doloremque tempora, nostrum exercitationem dolorem omnis! Provident, temporibus nisi exercitationem distinctio impedit perspiciatis adipisci enim.</p>
    </div>

    </div>
  )
}

export default ProfilePosts;
