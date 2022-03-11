const trivia = (state = [], { type, payload }) => {
  switch (type) {
  case 'RECEIVE_QUESTIONS':
    if (payload.response_code === 0) return [...payload.results];
    break;
  default: return state;
  }
};

export default trivia;