export const categories = [
  {
    name: 'cars',
    image: 'https://i.pinimg.com/564x/63/ee/c0/63eec086a5932081dd75f32e9f1c42c8.jpg',
  },
  {
    name: 'fitness',
    image: 'https://i.pinimg.com/564x/60/21/fe/6021fe437f53cabef1bf45a8d9f60c2d.jpg',
  },
  {
    name: 'wallpaper',
    image: 'https://i.pinimg.com/564x/c6/fd/5f/c6fd5f521f3af710cea4659fa41bc4e3.jpg',
  },
  {
    name: 'websites',
    image: 'https://i.pinimg.com/750x/66/b1/29/66b1296d36598122e6a4c5452b5a7149.jpg',
  },
  {
    name: 'photo',
    image: 'https://i.pinimg.com/236x/72/8c/b4/728cb43f48ca762a75da645c121e5c57.jpg',
  },
  {
    name: 'food',
    image: 'https://i.pinimg.com/564x/d6/df/f0/d6dff03bc5e48070d5280fc1a979ab06.jpg',
  },
  {
    name: 'nature',
    image: 'https://i.pinimg.com/564x/a7/95/ad/a795ad24787ac56759da2c9b82e47ed3.jpg',
  },
  {
    name: 'art',
    image: 'https://i.pinimg.com/736x/f4/e5/ba/f4e5ba22311039662dd253be33bf5f0e.jpg',
  }, {
    name: 'travel',
    image: 'https://i.pinimg.com/564x/9b/c9/f3/9bc9f38f5159cdbb8494adacb5a79104.jpg',
  },
  {
    name: 'quotes',
    image: 'https://i.pinimg.com/236x/46/7c/17/467c17277badb00b638f8ec4da89a358.jpg',
  }, {
    name: 'cats',
    image: 'https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg',
  }, {
    name: 'dogs',
    image: 'https://i.pinimg.com/564x/a6/4e/fd/a64efdf5a4be30ba38fd0190f4a51339.jpg',
  },
  {
    name: 'other',
    image: 'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg',
  },
];

export const userQuery = (userId) => {
  return `*[_type == 'user' && _id == '${userId}']`;
};

export const searchQuery = (searchTerm) => {
  return `*[_type == 'pin' && title match '${searchTerm}' || category match '${searchTerm}' || about match '${searchTerm}']{
    image {
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      }
    }
  }`;
};

export const feedQuery = `*[_type == 'pin'] | order(_createdAt desc) {
  image {
    asset -> {
      url
    }
  },
  _id,
  destination,
  postedBy -> {
    _id,
    userName,
    image
  },
  save[] {
    _key,
    postedBy -> {
      _id,
      userName,
      image
    }
  }
}`

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};