const questions = (state = [], { type, payload }) => {
  switch (type) {
  case 'RECEIVE_QUESTIONS':
    if (payload.response_code === 0) {
      return payload.results;
    }
    break;
  case 'REMOVE_QUESTION':
    return state.filter((questionEl) => questionEl.question !== payload)
  default: return state;
  }
};

export default questions;
