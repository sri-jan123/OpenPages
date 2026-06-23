import React, { useState } from 'react'

function EditPost() {
    const[cat,setCat]=useState("");
    const [cats,setCats]=useState([]);

    const deleteCategory=(i)=>{
       let updatedCats=[...cats]
       updatedCats.splice(i)
       setCats(updatedCats)
    } 

    const addCategory=()=>{
        let updatedCats=[...cats]
        updatedCats.push(cat)
        setCats(updatedCats)
        setCat('')
    }
  return (
    <div>
       <div className='px-6 md:px-[200px] mt-8'>
        <h1 className='font-bold md:text-2xl text-xl mt-8'>Update your post</h1>
        <form className='w-full flex flex-col space-y-4 space-y-8 mt-4'>
            <input type='text' placeholder='enter post title' className='px-4 py-2 outline-none'></input>
            <input type='file' className='px-4'></input>
            <div className='flex flex-col'>
                <div className='flex items-center space-x-4 md:space-x-8'>
                    <input value={cat} onChange={(e)=>setCat(e.target.value)}
                    className='px-4 py-2 outline-none' 
                    type='text' 
                    placeholder='enter post category'/>
                    <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'>Add</div>
                </div>

                <div className='flex px-4 mt-3'>
                    {
                        cats?.map((c,i)=>{
                           return <div key={i} className='flex justify-center items-center space-x-2 bg-gray-200 px-2 mr-4 py-1 rounded-md mt-3'>
                            <p>{c}</p>
                            <p onClick={()=>{
                                deleteCategory(i)
                            }} className='text-white bg-red-700 rounded-full cursor-pointer p-1 text-sm'>delete</p>
                        </div>
                        })
                    }
                </div>
                
            </div>
            <textarea rows={15} cols={30} className='px-4 py-2 outline-none' placeholder='enter post description'/>
            <button className='bg-black w-full md:w-[200px mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Update</button>
        </form>
     </div>
    </div>
  )
}

export default EditPost;
