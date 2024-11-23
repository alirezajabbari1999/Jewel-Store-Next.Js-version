import styles from "./answer.module.css";

const Answer = ({ type, Ticket }) => {
  return (
    <section
      className={type == "user" ? styles.userTicket : styles.adminticket}
    >
      <div className={styles.ticket_main}>
        <p>{new Date(Ticket.createdAt).toLocaleDateString("fa-IR")}</p>
        <div>
          <div>
            <p>{Ticket.user.name}</p>
            <span>{type === "user" ? "کاربر" : "مدیر"}</span>
          </div>
        </div>
      </div>
      <div className={styles.ticket_text}>
        <p>{Ticket.body}</p>
      </div>
    </section>
  );
};

export default Answer;
