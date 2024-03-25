import { Request, Response, NextFunction } from "express";

interface UserWithRole {
  role?: string;
}

interface RequestWithUserRole extends Request {
  user?: UserWithRole;
}

export const isAdmin = async (
  req: RequestWithUserRole,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;

  if (!user || (user.role && user.role !== "ADMIN")) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  next();
};

export const isUser = async (
  req: RequestWithUserRole,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;

  if (!user || (user.role && user.role !== "USER")) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  next();
};
