import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";
import { EventReqType } from "../../types";

export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  try {
    const events = await prisma.events.findMany({});
    return res.status(200).json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  const body: EventReqType = req.body;
  const { title, description, startDate } = body;
  try {
    await prisma.events.create({
      data: {
        startDate,
        title,
        description,
      },
    });
    return res.status(200).json({
      message: "success",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
};

export async function deleteEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body: { id: string } = await req.body();

    const { id } = body;

    await prisma.events.delete({
      where: { id },
    });
    return res.json({ message: "Success" }).status(200);
  } catch (error) {
    console.error(error);
    return res.json({ error: "Internal server error" }).status(500);
  }
}
