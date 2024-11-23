"use client";
import { useState, useEffect } from "react";
import styles from "./commentForm.module.css";
import { IoMdStar } from "react-icons/io";
import swal from "sweetalert";

export default function CommentForm({ productID }) {
  const [username, setUsername] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [score, setScore] = useState("");

  const setCommentScore = (score) => {
    setScore(score);
    swal({
      title: "امتیاز مورد نظر انتخاب شد",
      icon: "success",
      buttons: "متوجه شدم",
    });
  };

  const submitComment = async () => {
    const res = await fetch("/api/auth/me");
    if (res.status === 200) {
      if (!username.trim()) {
        swal({
          title: "لطفا نام کاربری خود را وارد کنید",
          icon: "warning",
          buttons: "متوجه شدم",
        });
        return false;
      }
      if (!score) {
        swal({
          title: "لطفا امتیاز مد نظر خود را وارد کنید",
          icon: "warning",
          buttons: "متوجه شدم",
        });
        return false;
      }
      if (!body.trim()) {
        swal({
          title: "لطفا متن دیدگاه خود را وارد کنید",
          icon: "warning",
          buttons: "متوجه شدم",
        });
        return false;
      }
      if (!email.trim()) {
        swal({
          title: "لطفا متن دیدگاه خود را وارد کنید",
          icon: "warning",
          buttons: "متوجه شدم",
        });
        return false;
      }

      const comment = {
        username,
        body,
        email,
        score,
        productID,
      };

      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      if (res.status === 201) {
        swal({
          title: " کامنت شما موفقیت ثبت شد",
          icon: "success",
          buttons: "متوجه شدم",
        });
        setUsername(""), setBody(""), setEmail(""), setScore("");
      }
    } else {
      swal({
        title: "برای ثبت کامنت ابتدا باید لاگین کنید",
        icon: "error",
        buttons: "متوجه شدم",
      });
    }
  };

  // به محض لود شدن صفحه اطلاعات کاربر لاگین شده رو میگیره و در استیت ها ذخیر میکنه
  useEffect(() => {
    const userInfo = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (res.status === 200) {
        setUsername(data.username);
        setEmail(data.email);
      }
    };
    userInfo();
  }, []);

  return (
    <>
      <div className={styles.form}>
        <p className={styles.title}>دیدگاه خود را بنویسید</p>
        <p>
          نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
          <span style={{ color: "red" }}>*</span>
        </p>
        <div className={styles.rate}>
          <p>امتیاز شما :</p>
          <div>
            <IoMdStar
              className={styles.starIcon}
              onClick={() => setCommentScore(5)}
            />
            <IoMdStar
              className={styles.starIcon}
              onClick={() => setCommentScore(4)}
            />
            <IoMdStar
              className={styles.starIcon}
              onClick={() => setCommentScore(3)}
            />
            <IoMdStar
              className={styles.starIcon}
              onClick={() => setCommentScore(2)}
            />
            <IoMdStar
              className={styles.starIcon}
              onClick={() => setCommentScore(1)}
            />
          </div>
        </div>
        <div className={styles.group}>
          <label htmlFor="">
            دیدگاه شما
            <span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            id="comment"
            name="comment"
            cols="45"
            rows="8"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.groups}>
          <div className={styles.group}>
            <label htmlFor="">
              نام
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!!username} // اگر username دارای مقدار باشد، اینپوت غیرفعال می‌شود
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="">
              ایمیل
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!!email} // اگر email دارای مقدار باشد، اینپوت غیرفعال می‌شود
            />
          </div>
        </div>
        <button onClick={submitComment}>ثبت</button>
      </div>
    </>
  );
}
