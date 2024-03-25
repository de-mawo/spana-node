import { NextFunction, Response, Request } from "express";
import { EditUserTypes } from "../../types";
import prisma from "../utils/prisma";

export async function editUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body: EditUserTypes = await req.body();

    const { phone, department, id, role, title } = body;

    await prisma.user.update({
      where: { id },
      data: { phone, department, role, title },
    });

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const usersData = await prisma.user.findMany({
      orderBy: [{ name: "desc" }],
    });

    return res.status(200).json(usersData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getUserInfo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const email = req.params;
    const userData = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
