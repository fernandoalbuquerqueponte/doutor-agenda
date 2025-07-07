import { endOfMonth, startOfMonth } from "date-fns";
import { and, count, eq, gte, lte } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

const currentMonth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.clinic?.id)
    throw new Error("Sessão inválida ou clínica não definida");

  const [totalDoctors] = await db
    .select({
      total: count(doctorsTable.id),
    })
    .from(doctorsTable)
    .where(
      and(
        eq(doctorsTable.clinicId, session?.user.clinic?.id),
        gte(doctorsTable.createdAt, startOfMonth(new Date())),
        lte(doctorsTable.createdAt, endOfMonth(new Date())),
      ),
    );

  const [totalPatients] = await db
    .select({
      total: count(patientsTable.id),
    })
    .from(patientsTable)
    .where(
      and(
        eq(patientsTable.clinicId, session?.user.clinic?.id),
        gte(patientsTable.createdAt, startOfMonth(new Date())),
        lte(patientsTable.createdAt, endOfMonth(new Date())),
      ),
    );

  const [totalAppointments] = await db
    .select({
      total: count(appointmentsTable.id),
    })
    .from(appointmentsTable)
    .where(
      and(
        eq(appointmentsTable.clinicId, session?.user.clinic?.id),
        gte(appointmentsTable.createdAt, startOfMonth(new Date())),
        lte(appointmentsTable.createdAt, endOfMonth(new Date())),
      ),
    );

  return {
    totalPatients: totalPatients,
    totalAppointments: totalAppointments,
    totalDoctors: totalDoctors,
  };
};

export default currentMonth;
