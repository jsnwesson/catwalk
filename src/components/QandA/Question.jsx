import React, { useState } from 'react';
import axios from 'axios';
import { Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AnswersList from './AnswersList';
import SubmitAnswerForm from './SubmitAnswerForm';
import './Question.css';

function Question({ q }) {
  const [helpful, setHelpful] = useState(q.question_helpfulness);
  const [helpfulClick, setHelpfulClick] = useState(false);

  function handleHelpful() {
    if (helpfulClick === false) {
      axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${q.question_id}/helpful`, {})
        .then(() => {
          setHelpful(helpful + 1);
          setHelpfulClick(true);
        })
        .catch((error) => {
          throw error;
        });
    }
  }

  return (
    <Grid centered container id="question">
      <Grid.Row columns={3} className="question_row">
        <Grid.Column textAlign="left" width={10}>
          <h4>
            Q: &quot;
            {q.question_body}
            &quot;
          </h4>
        </Grid.Column>
        <Grid.Column textAlign="right" width={3}>
          <Button id="buttonQuestion" size="mini" onClick={handleHelpful}>
            Helpful?&nbsp;&nbsp;
            <u>Yes</u>
            (
            {helpful}
            )
          </Button>
        </Grid.Column>
        <Grid.Column width={3}>
          <SubmitAnswerForm id={q.question_id} body={q.question_body} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="answer_row">
        <AnswersList answersObj={q.answers} />
      </Grid.Row>
    </Grid>
  );
}

Question.propTypes = {
  q: PropTypes.shape(),
};
Question.defaultProps = {
  q: {},
};
export default Question;
