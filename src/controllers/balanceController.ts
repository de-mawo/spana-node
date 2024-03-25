import { NextFunction, Response, Request } from "express";
import { CreateCreditsType, EditBalanceType } from "../../types";
import prisma from "../utils/prisma";
import { User } from "@prisma/client";

export async function createBalance(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body: CreateCreditsType = await req.body();

    const {
      annual,
      family,
      health,
      study,
      maternity,
      paternity,
      year,
      email,
      name,
    } = body;

    const existingCredits = await prisma.balances.findFirst({
      where: {
        year,
        email,
      },
    });

    if (existingCredits) {
      return res
        .json({ message: "Credits for the current period already exists" })
        .status(400);
    }

    await prisma.balances.create({
      data: {
        name,
        email,
        year,
        annualCredit: annual,
        familyCredit: family,
        healthCredit: health,
        studyCredit: study,
        maternityCredit: maternity,
        paternityCredit: paternity,
      },
    });

    return res.json({ message: "Success" }).status(200);
  } catch (error) {
    console.error(error);
    return res.json({ error: "Internal server error" }).status(500);
  }
}

// The Client must send all data for all columns of this table
export async function editBalance(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body: EditBalanceType = await req.body();

    const { id, ...data } = body;

    await prisma.balances.update({
      where: { id },
      data,
    });
    return res.json({ message: "Success" }).status(200);
  } catch (error) {
    console.error(error);
    return res.json({ error: "Internal server error" }).status(500);
  }
}

export async function getUserBalances(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as User; 
    const email = user.email as string;

    const year = new Date().getFullYear().toString(); // This needs to be dynamic

    const userBalances = await prisma.balances.findFirst({
      where: {
        email,
        year,
      },
    });

    return res.status(200).json(userBalances);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllBalances(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const allBalances = await prisma.balances.findMany({
      orderBy: [{ year: "desc" }],
    });

    return res.status(200).json(allBalances);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
