import UserPanelLayout from "@/src/components/layouts/UserPanelLayout";
import AccountDetails from "@/src/components/templates/p-user/details/AccountDetails";

const page = () => {
  return (
    <UserPanelLayout>
      <AccountDetails />
    </UserPanelLayout>
  );
};

export default page;
