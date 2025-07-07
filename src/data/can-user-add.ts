import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import currentMonth from "./current-month";

const LIMITS = {
  doctors: 1,
  patients: 5,
  appointments: 5,
} as const;

type ResourceType = keyof typeof LIMITS;

export const canUserAddResource = async (resource: ResourceType) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) throw new Error("unauthorized");

  const plan = session?.user.plan;

  if (plan === "essential") return true;

  const { totalDoctors, totalPatients, totalAppointments } =
    await currentMonth();

  const totals = {
    doctors: totalDoctors.total,
    patients: totalPatients.total,
    appointments: totalAppointments.total,
  };

  return totals[resource] < LIMITS[resource];
};
