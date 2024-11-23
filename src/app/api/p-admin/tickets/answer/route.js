import connectToDB from "@/config/db";
import ticketModel from "@/models/Ticket";
import { authUser } from "@/utils/serverHelpers";

export async function POST(req) {
  try {
    await connectToDB();
    const { title, body, department, subDepartment, priority, ticketId } =
      await req.json();

    const user = await authUser();

    await ticketModel.findOneAndUpdate(
      { _id: ticketId },
      {
        $set: {
          hasAnswer: true,
        },
      }
    );

    await ticketModel.create({
      title,
      body,
      department,
      subDepartment,
      priority,
      user: user._id,
      hssAnswer: false,
      isAnswer: true,
      mainTicket: ticketId,
    });

    return Response.json(
      { message: "Answer saved successfuly" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ error: "Unknown Internal Error" }, { status: 500 });
  }
}
