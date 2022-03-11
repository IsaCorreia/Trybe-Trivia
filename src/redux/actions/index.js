export const saveUserInfo = (nome, email) => ({
  type: 'SAVE_USER_INFO',
  payload: {
    name: nome,
    gravatarEmail: email,
  },
});

export const requestTrivia = () => ({ type: 'REQUEST_TRIVIA' });
export const receiveTrivia = (trivia) => ({ type: 'RECEIVE_TRIVIA', payload: trivia });
export const fetchTrivia = () => (dispatch) => {
  dispatch(requestTrivia());
  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((trivia) => dispatch(receiveTrivia(trivia)));
};

export const requestQuestions = () => ({type: 'REQUEST_QUESTIONS'});
export const receiveQuestions = (questions) => ({type: 'RECEIVE_QUESTIONS', payload: questions});
export const fetchQuestions = (token) => (dispatch) => {
  const codeTokenInvalid = ['3', '4']
  dispatch(requestQuestions());
  return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then((questions) => {
      if (codeTokenInvalid.includes(questions.response_code)){
        fetch('https://opentdb.com/api_token.php?command=request')
        .then((response) => response.json())
        .then((trivia) => {
          dispatch(receiveTrivia(trivia));
          fetchQuestions(token);
          return;
        });
      }
      return dispatch(receiveTrivia(questions))
    });
};
