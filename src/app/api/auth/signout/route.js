import React from 'react'
import { cookies } from 'next/headers'

export async function POST(req) {
  cookies().delete("token");
  return Response.json({message:"User sign out!!"},{status: 200})
}
