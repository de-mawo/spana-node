import { NextFunction, Response, Request } from "express";
import { differenceInDays, parseISO } from "date-fns";
import prisma from "../utils/prisma";
import { CreateLeaveType, EditLeaveType } from "../../types";
import { LeaveStatus, User } from "@prisma/client";
import calculateAndUpdateBalances from "../utils/calcBalances";

export async function createLeave(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body: CreateLeaveType = await req.body();

    const { startDate, endDate, leave, userEmail, userNote, userName } = body;

    const startDateObj = parseISO(startDate);
    const endDateObj = parseISO(endDate);
    const calcDays = differenceInDays(endDateObj, startDateObj) + 1;

    const existingLeave = await prisma.leave.findFirst({
      where: {
        startDate,
        endDate,
        userEmail,
      },
    });

    if (existingLeave) {
      return res.status(400).json({ message: "Leave entry already exists" });
    }

    const year = new Date().getFullYear().toString();
    await prisma.leave.create({
      data: {
        startDate,
        endDate,
        userEmail,
        type: leave,
        userNote,
        userName,
        days: calcDays,
        year,
      },
    });

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function editLeave(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body: EditLeaveType = await req.body();

    const { notes, status, id, days, type, year, email, user, startDate } =
      body;

    const updatedAt = new Date().toISOString();
    const LoggedInUser = req.user as User;
    const { name: moderator } = LoggedInUser;

    if (status === LeaveStatus.APPROVED) {
      await calculateAndUpdateBalances(email, year, type, days);
      const title = `${user} on Leave`;
      const description = `For ${days} days`;
      await prisma.events.create({
        data: {
          startDate,
          title,
          description,
        },
      });
    }
    await prisma.leave.update({
      where: { id },
      data: { moderatorNote: notes, status, updatedAt, moderator },
    });

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getUserLeaveDays(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as User;
    const userEmail = user.email as string;
    const leaves = await prisma.leave.findMany({
      where: {
        userEmail,
      },
      orderBy: [{ createdAt: "desc" }],
    });

    return res.status(200).json(leaves);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllLeaveDays(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const leaves = await prisma.leave.findMany({
      orderBy: [{ createdAt: "desc" }],
    });

    return res.status(200).json(leaves);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
