import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { EventReqType } from "../../types";





export const getAllEvents = async (req: Request, res: Response) => {
 
  
  try {
    const events = await prisma.events.findMany({});
    return res.status(200).json({
      message: "success",
      data: { events },
    });
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
