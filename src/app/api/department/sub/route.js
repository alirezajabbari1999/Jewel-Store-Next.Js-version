import connectToDB from "@/config/db";
import subDepartmentModel from "@/models/SubDepartment";

export async function POST(req) {
  try {
    await connectToDB();

    const { title, department } = await req.json();
    if (!title.trim()) {
      return Response.json({ message: "title not valid" }, { status: 400 });
    }
    if (!department.trim()) {
      return Response.json(
        { message: "department not valid" },
        { status: 400 }
      );
    }

    await subDepartmentModel.create({ title, department });
    return Response.json(
      { message: "SubDepartment create successfuly" },
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
    const allSubDepartments = await subDepartmentModel.find({});
    return Response.json(allSubDepartments, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: "Unknown Internal Error!" },
      { status: 500 }
    );
  }
}
