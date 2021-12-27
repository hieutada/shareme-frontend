import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import Pin from './Pin';
import Spinner from './Spinner';

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    if (categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading)
    return <Spinner message='We are adding new ideas to your feed!' />;

  return (
    <div>
      {pins && (
        <Masonry
          className='flex animate-slide-fwd'
          breakpointCols={breakpointObj}
        >
          {pins?.map((pin) => (
            <Pin key={pin._id} pin={pin} className='w-max' />
          ))}
        </Masonry>
      )}
    </div>
  );
};

export default Feed;
