import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

const NavBar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      <div className='flex flex-1 justify-start items-center px-2 bg-white rounded-md border-md outline-none focus-within:shadow-sm'>
        <IoMdSearch fontSize={21} className='mx-2' />
        <input
          type='text'
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search'
          value={searchTerm}
          onFocus={()=>navigate('/search')}
          className='p-2 w-full outline-none'
        />
      </div>
      <div className="flex gap-3">
        <Link to={`user-profile/${user?._id}`} className='hidden md:block'>
          <img src={user.image} alt="user" className='w-12 h-12 rounded-lg object-cover'/>
        </Link>
        <Link to='create-pin' className='bg-red-500 text-white rounded-lg w-10 h-10 md:w-12 md:h-12 flex justify-center items-center'>
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
