import { LeaveStatus } from "@prisma/client";

export type EventReqType = {
  title: string;
  description: string;
  startDate: string;
};

//Balances Types

export type CreateCreditsType = {
  annual: number;
  family: number;
  health: number;
  study: number;
  maternity: number;
  paternity: number;
  unpaid: number;
  email: string;
  year: string;
  name: string;
};

export type EditBalanceType = {
  [key: string]: number | string;
  id: string;
};

// Leave Types

export type CreateLeaveType = {
  leave: string;
  startDate: string;
  endDate: string;
  userName: string;
  userNote: string;
  userEmail: string;
};

export type EditLeaveType = {
  notes: string;
  status: LeaveStatus;
  id: string;
  days: number;
  type: string;
  year: string;
  email: string;
  user: string;
  startDate: string;
};
