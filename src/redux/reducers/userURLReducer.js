const INITIAL_STATE = {};

const userPictureURL = (state = INITIAL_STATE, { type, payload }) => {  
  switch (type) {
    case 'ADD_IMAGE_URL':
    return payload;
    default: return state;
  }
};

export default userPictureURL;
