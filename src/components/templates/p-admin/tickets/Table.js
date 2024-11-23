"use client";
import React,{useState} from "react";
import styles from "./table.module.css";
import swal from "sweetalert";

export default function DataTable({ title, tickets }) {
  // تیکت های پتسخ داده شده آی دیشون اینجا ذخیره میشه
  const [answeredTickets, setAnsweredTickets] = useState([]);

  const showTicketBody = (body) => {
    swal({
      title: body,
      icon: undefined,
      buttons: "بستن",
    });
  };

  const ticketAnswerHandler = (ticket) => {
    swal({
      title: "لطفا پاسخ مد نظر را وارد کنید :",
      content: "input",
      buttons: "ثبت پاسخ",
    }).then(async (answerText) => {
      if (answerText) {
        const answer = {
          ...ticket,
          body: answerText,
          ticketId: ticket._id,
        };

        const res = await fetch("/api/p-admin/tickets/answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answer),
        });
        if (res.status === 201) {
          swal({
            title: "پاسخ با موفقیت ثبت شد",
            icon: "success",
            buttons: "متوجه شدم",
          });
          // اضافه کردن ID تیکت به لیست پاسخ داده شده‌ها
          setAnsweredTickets((prev) => [...prev, ticket._id]);
        }
      }
    });
  };

  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>عنوان</th>
              <th>دپارتمان</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>{ticket.user.username}</td>
                <td>{ticket.title}</td>
                <td>{ticket.department.title}</td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => showTicketBody(ticket.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => ticketAnswerHandler(ticket)}
                    disabled={answeredTickets.includes(ticket._id)}
                  >
                    {answeredTickets.includes(ticket._id)
                      ? "پاسخ داده شده"
                      : "پاسخ"}
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
                    بن
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
