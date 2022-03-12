export const saveUserInfo = (nome, email) => ({
  type: 'SAVE_USER_INFO',
  payload: {
    name: nome,
    gravatarEmail: email,
  },
});

export const requestTrivia = () => ({ type: 'REQUEST_TRIVIA' });

export const receiveTrivia = (trivia) => ({
  type: 'RECEIVE_TRIVIA',
  payload: trivia,
});

export const addImageURL = (payload) => ({
  type: 'ADD_IMAGE_URL',
  payload,
});

export const fetchTrivia = () => (dispatch) => {
  dispatch(requestTrivia());
  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((trivia) => dispatch(receiveTrivia(trivia)));
};

export const requestQuestions = () => ({ type: 'REQUEST_QUESTIONS' });
export const receiveQuestions = (questions) => ({
  type: 'RECEIVE_QUESTIONS',
  payload: questions,
});

const fetchAPI = (token) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
  .then((response) => response.json())
  .then((questions) => questions);
export const fetchQuestions = (token) => (dispatch) => {
  dispatch(requestQuestions());
  return fetchAPI(token)
    .then((tokenAPIResult) => {
      if (tokenAPIResult.response_code !== 0) {
        fetch('https://opentdb.com/api_token.php?command=request')
          .then((response) => response.json())
          .then((trivia) => fetchAPI(trivia.token)
            .then((triviaAPIResult) => dispatch(receiveQuestions(triviaAPIResult)))
            .catch((error) => console.log(error)));
      }
      return dispatch(receiveQuestions(tokenAPIResult));
    })
    .catch((error) => console.log(error));
};
