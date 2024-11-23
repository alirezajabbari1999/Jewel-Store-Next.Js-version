import connectToDB from "@/config/db";
import ticketModel from "@/models/Ticket";
import { authUser } from "@/utils/serverHelpers";

export async function POST(req) {
  try {
    connectToDB();
    const user = await authUser();
    const { title, body, priority, department, subDepartment } =
      await req.json();

    if (!title.trim()) {
      return Response.json(
        { message: "title cant be empty!" },
        { status: 400 }
      );
    }
    if (!body.trim()) {
      return Response.json({ message: "body cant be empty!" }, { status: 400 });
    }
    if (!department) {
      return Response.json(
        { message: "Please select a department!" },
        { status: 400 }
      );
    }
    if (!subDepartment) {
      return Response.json(
        { message: "Please select a sub-department!" },
        { status: 400 }
      );
    }
    if (!priority) {
      return Response.json(
        { message: "Please select a priority!" },
        { status: 400 }
      );
    }

    await ticketModel.create({
      title,
      body,
      department,
      subDepartment,
      priority,
      user: user._id,
    });

    return Response.json(
      { message: "ticket send successfuly" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      { message: "Unknown Internal Error!", err },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    connectToDB();
    const allTickets = await ticketModel.find({});
    return Response.json({ allTickets }, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: "Unknown Internal Error!", err },
      { status: 500 }
    );
  }
}
