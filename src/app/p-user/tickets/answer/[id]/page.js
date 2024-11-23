import UserPanelLayout from "@/src/components/layouts/UserPanelLayout";
import styles from "@/src/styles/p-user/answerTicket.module.css";
import Link from "next/link";
import Answer from "@/src/components/templates/p-user/tickets/Answer";
import connectToDB from "@/config/db";
import TicketModel from "@/models/Ticket";

export default async function Page({ params }) {
  // دریافت آی‌دی تیکت
  const ticketID = params.id;
  await connectToDB();

  // پیدا کردن تیکت اصلی
  const ticket = await TicketModel.findOne({ _id: ticketID })
    .populate("user")
    .lean();

  // پیدا کردن پاسخ مرتبط با تیکت
  const answerdTicket = await TicketModel.findOne({
    mainTicket: ticket?._id,
  })
    .populate("user")
    .lean();

  return (
    <UserPanelLayout>
      <main className={styles.container}>
        <h1 className={styles.title}>
          <span>تیکت</span>
          <Link href="/p-user/tickets/sendTicket">ارسال تیکت جدید</Link>
        </h1>
        <div>
          {ticket && <Answer type="user" Ticket={ticket} />}
          {answerdTicket ? (
            <Answer type="admin" Ticket={answerdTicket} />
          ) : (
            <div className={styles.empty}>
              <p>هنوز پاسخی دریافت نکردید</p>
            </div>
          )}
        </div>
      </main>
    </UserPanelLayout>
  );
}
