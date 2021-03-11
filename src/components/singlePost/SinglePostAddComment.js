import { Card, Form, Icon } from 'semantic-ui-react'

import { ButtonSpinner } from '../buttonGroup/ButtonSpinner'

export const SinglePostAddComment = ({
  comment,
  commentInputRef,
  handleComment,
  loading,
  submitComment,
}) => (
  <Card fluid>
    <Card.Content>
      <p>Post a comment</p>
      <Form>
        <div className="ui action input fluid">
          <input
            type="text"
            placeholder="Comment..."
            name="comment"
            value={comment}
            onChange={handleComment}
            ref={commentInputRef}
          />
          <button
            type="submit"
            className="ui button teal"
            disabled={comment.trim() === ''}
            onClick={submitComment}
          >
            {loading ? <ButtonSpinner /> : <Icon name="send" />}
            Submit
          </button>
        </div>
      </Form>
    </Card.Content>
  </Card>
)
