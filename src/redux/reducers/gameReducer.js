const questions = (state = [], { type, payload }) => {
  switch (type) {
  case 'RECEIVE_QUESTIONS':
    if (payload.response_code === 0) {
      const { results } = payload;
      const newQuestions = results.reduce((acc, cur) => {
        const correctAnswer = { answer: cur.correct_answer, tag: 'correct-answer' };

        const incorrectAnswer = cur.incorrect_answers
          .reduce((accAns, curAns, idx) => accAns
            .push({ answer: curAns, tag: `wrong-answer-${idx}` }) && accAns, []);

        const allAnswers = [correctAnswer, ...incorrectAnswer];
        const RANDOM_POS = 0.5;
        const shuffledAnswers = allAnswers.sort(() => RANDOM_POS - Math.random()); // https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj#:~:text=The%20first%20and%20simplest%20way,)%20%3D%3E%200.5%20%2D%20Math.
        acc.push({
          ...cur,
          shuffledAnswers,
        });
        return acc;
      }, []);
      return newQuestions;
    }
    break;
  case 'REMOVE_QUESTION':
    return state.filter((questionEl) => questionEl.question !== payload);
  default: return state;
  }
};

export default questions;
