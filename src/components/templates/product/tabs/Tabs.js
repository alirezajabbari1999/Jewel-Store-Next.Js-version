"use client";
import { useState } from "react";
import styles from "./tabs.module.css";
import Description from "./Description";
import Comments from "./Comments";

export default function Tabs({ product, allComments }) {
  const [tab, setTab] = useState("description");

  return (
    <div data-aos="fade-up" className={styles.tabs}>
      <ul>
        <li>
          <button
            className={tab === "description" ? styles.active_tab : ""}
            onClick={() => setTab("description")}
          >
            توضیحات
          </button>
        </li>
        <li>
          <button
            className={tab === "comments" ? styles.active_tab : ""}
            onClick={() => setTab("comments")}
          >
            نظرات (
            {
              product?.comments.filter((comment) => comment.isAccept == true)
                .length
            }
            )
          </button>
        </li>
      </ul>

      <div className={styles.contents}>
        <section>
          {tab == "comments" && (
            <Comments
              product={product}
              userComments={product.comments}
              allComments={allComments}
            />
          )}

          {tab === "description" && <Description product={product} />}
        </section>
      </div>
    </div>
  );
}
