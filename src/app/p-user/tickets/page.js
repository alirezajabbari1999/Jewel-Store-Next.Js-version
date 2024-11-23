import Layout from "@/src/components/layouts/UserPanelLayout";
import Tickets from "@/src/components/templates/p-user/tickets/Tickets";
import connectToDB from "@/config/db";
import { authUser } from "@/utils/serverHelpers";
import TicketModel from "@/models/Ticket";

const page = async () => {
  connectToDB();
  const user = await authUser();
  const tickets = await TicketModel.find({ user: user._id, isAnswer: false })
    .populate(
      "department",
      "title"
      // اینجا گفتیم اول دپارتمنت رو پاپیولیت کن و از دپارتمنت هم فقط تایتلش رو میخوام
    )
    .sort({ _id: -1 }); // باعث میشه که اطلاعات از آخر به اول رندر شن یعنی اول تیکت های آخیر نمایش داده میشه بعد تیکت های قدیمی

  return (
    <Layout>
      <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
    </Layout>
  );
};

export default page;
