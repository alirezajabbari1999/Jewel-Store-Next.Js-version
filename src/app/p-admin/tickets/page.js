import AdminPanelLayout from "@/src/components/layouts/AdminPanelLayout";
import ticketModel from "@/models/Ticket";
import Table from "@/src/components/templates/p-admin/tickets/Table";
import connectToDB from "@/config/db";

export default async function page() {
  connectToDB();
  const tickets = await ticketModel
    .find({ isAnswer: false })
    .sort({ _id: -1 })
    .populate("department")
    .populate("user")
    .lean();

  return (
    <AdminPanelLayout>
      {tickets.lenght === 0 ? (
        <p className={styles.empty}>تیکتی وجود ندارد</p>
      ) : (
        <Table
          tickets={JSON.parse(JSON.stringify(tickets))}
          title={"تیکت ها"}
        />
      )}
    </AdminPanelLayout>
  );
}
