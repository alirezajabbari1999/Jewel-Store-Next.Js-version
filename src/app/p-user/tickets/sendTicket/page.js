import UserPanelLayout from "@/src/components/layouts/UserPanelLayout";
import SendTickets from "@/src/components/templates/p-user/tickets/SendTicket";

const page = () => {
  return (
    <UserPanelLayout>
      <SendTickets />
    </UserPanelLayout>
  );
};

export default page;
