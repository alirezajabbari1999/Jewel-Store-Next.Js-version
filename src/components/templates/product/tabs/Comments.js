import Comment from "./Comment";
import CommentForm from "./CommentForm";
import styles from "./comments.module.css";
import { Row, Col } from "react-bootstrap";

export default function Comments({ product, userComments, allComments }) {
  const adminReply = allComments.filter(
    (comment) => comment.replyTo
  );

  return (
    <div className={styles.comments} data-aos="fade-up">
      <Row>
        <Col lg={6} className={styles.commentsCol}>
          <div className={styles.user_comments}>
            <p className={styles.title}>
              {userComments.filter((comment) => comment.isAccept).length} دیدگاه
              برای : ( {product.name} )
            </p>
            <div>
              {userComments.map(
                (comment) =>
                  comment.isAccept && (
                    <Comment
                      key={comment._id}
                      comment={comment}
                      adminReply={adminReply}
                    />
                  )
              )}
            </div>
          </div>
        </Col>

        <Col lg={6} className={styles.formCol}>
          <CommentForm productID={product._id} />
        </Col>
      </Row>
    </div>
  );
}
