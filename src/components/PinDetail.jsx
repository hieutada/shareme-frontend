import React, { useEffect, useState } from 'react';
import { MdDownloadForOffline, MdLink } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils';
import Spinner from './Spinner';
import MasonryLayout from './MasonryLayout';

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);

        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);

          client.fetch(query).then((res) => setPins(res));
        }
      });
    }
  };

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: 'postedBy',
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  if (!pinDetail) return <Spinner message='Loading pin...' />;
  // else {
  //   console.log(pinDetail.comments);
  // }

  return (
    <>
      <div
        className='flex xl:flex-row flex-col m-auto bg-white'
        style={{ maxWidth: '1500px', borderRadius: '32px' }}
      >
        <div className='flex justify-center items-center md:items-start flex-initial'>
          <img
            src={pinDetail?.image && urlFor(pinDetail?.image).url()}
            alt='user-post'
            className='rounded-t-3xl rounded-b-lg max-w-md'
          />
        </div>
        <div className='w-full p-5 flex-1 xl:min-w-620'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
              <a
                href={`${pinDetail.image?.asset.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className='bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100'
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a
              href={pinDetail.destination}
              target='_blank'
              rel='noreferrer'
              className='bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100'
            >
              <MdLink />
            </a>
          </div>
          <div>
            <h1 className='text-4xl font-bold breal-words mt-3'>
              {pinDetail.title}
            </h1>
            <p className='mt-3'>{pinDetail.about}</p>
          </div>
          <Link
            to={`user-profile/${pinDetail.postedBy?._id}`}
            className='flex gap-3 mt-5 items-center bg-white rounded-lg'
          >
            <img
              src={pinDetail.postedBy?.image}
              alt='user-profile'
              className='w-8 h-8 rounded-full object-cover'
            />
            <p className='font-semibold capitalize'>
              {pinDetail.postedBy?.userName}
            </p>
          </Link>
          <h2 className='mt-5 text-2xl'>Comments</h2>
          <div className='max-h370 overflow-y-auto'>
            {pinDetail?.comments?.map((item, idx) => (
              <div
                key={idx}
                className='flex gap-4 mt-5 items-center bg-white rounded-lg'
              >
                <img
                  src={item.postedBy?.image}
                  alt='user-profile'
                  className='w-10 h-10 rounded-full cursor-pointer'
                />
                <div className='flex flex-col'>
                  <p className='font-bold'>{item.postedBy?.userName}</p>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex flex-wrap mt-6 gap-3'>
            <Link to={`user-profile/${pinDetail.postedBy?._id}`}>
              <img
                src={pinDetail.postedBy?.image}
                alt='user-profile'
                className='w-10 h-10 rounded-full cursor-pointer'
              />
            </Link>
            <input
              type='text'
              placeholder='Add comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300 '
            />
            <button
              type='button'
              onClick={addComment}
              className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none'
            >
              {addingComment ? 'Posting the comment...' : 'Post'}
            </button>
          </div>
        </div>
      </div>

      {pins?.length > 0 ? (
        <>
          <h2 className='text-center font-bold text-2x mt-8 mb-4'>
            More like this
          </h2>
          <MasonryLayout pins={pins} />
        </>
      ) : (
        <Spinner message='Loading more pins...' />
      )}
    </>
  );
};

export default PinDetail;
