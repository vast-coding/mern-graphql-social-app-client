import { Card, Form } from 'semantic-ui-react'

export const SinglePostAddComment = ({
  comment,
  commentInputRef,
  handleComment,
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
            Submit
          </button>
        </div>
      </Form>
    </Card.Content>
  </Card>
)
