"use client";
import styles from "./comment.module.css";
import { FaStar, FaRegStar } from "react-icons/fa";
import Image from "next/image";
import img from "@/public/images/me.jpg";

export default function Comment({ comment, adminReply }) {
  // فیلتر کردن پاسخ‌های مرتبط با این کامنت
  const filteredReplies = adminReply?.filter(
    (reply) => reply.replyTo === comment._id
  );

  return (
    <section className={styles.comment}>
      <Image src={img} className={styles.avatar} alt="" />
      <div>
        <div className={styles.main_details}>
          <div className={styles.userInfo}>
            <strong>{comment.username}</strong>
            <p>{new Date(comment.date).toLocaleDateString("fa-IR")}</p>
          </div>
          <div className={styles.stars}>
            {new Array(comment.score).fill(0).map((_, index) => (
              <FaStar key={`star-${index}`} />
            ))}
            {new Array(5 - comment.score).fill(0).map((_, index) => (
              <FaRegStar key={`empty-star-${index}`} />
            ))}
          </div>
        </div>
        <p>{comment.body}</p>

        {/* نمایش پاسخ‌ها */}
        {filteredReplies && filteredReplies.length > 0 && (
          <div className={styles.replies}>
            {filteredReplies.map((reply) => (
              <div key={reply._id} className={styles.reply}>
                <div className={styles.replyHeader}>
                  <span className={styles.replyRole}>مدیر :</span>
                  <span>
                    {new Date(reply.date).toLocaleDateString("fa-IR")}
                  </span>
                </div>
                <p className={styles.replyBody}>{reply.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
