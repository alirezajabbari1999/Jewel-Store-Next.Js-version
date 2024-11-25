import connectToDB from "@/config/db";
import departmentModel from "@/models/Department";

export async function POST(req) {
  try {
    await connectToDB();

    const { title } = await req.json();
    if (!title.trim()) {
      return Response.json({ message: "title not valid" }, { status: 400 });
    }

    await departmentModel.create({ title });
    return Response.json(
      { message: "Department create successfuly" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      { message: "Unknown Internal Error!" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDB();
    const allDepartments = await departmentModel.find({});
    return Response.json(allDepartments, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: "Unknown Internal Error!" },
      { status: 500 }
    );
  }
}
