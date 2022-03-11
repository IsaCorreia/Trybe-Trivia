const questions = (state = {}, { type, payload }) => {
  switch (type) {
  case 'RECEIVE_QUESTIONS':
    if (payload.response_code === 0) {
      localStorage.setItem('token', payload.token);

      return payload.results;
    }
    break;
  default: return state;
  }
};

export default questions;
