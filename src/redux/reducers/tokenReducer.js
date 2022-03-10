const token = (state = {}, { type, payload }) => {
  switch (type) {
  case 'RECEIVE_TRIVIA':
    if (payload.response_code === 0) {
      localStorage.setItem('token', payload.token);

      return payload.token;
    }
    break;
  default: return state;
  }
};

export default token;
