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
