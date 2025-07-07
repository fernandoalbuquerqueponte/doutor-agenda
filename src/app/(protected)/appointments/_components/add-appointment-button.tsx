"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { doctorsTable, patientsTable } from "@/db/schema";

import AddAppointmentForm from "./add-appointment-form";

interface AddAppointmentButtonProps {
  patients: (typeof patientsTable.$inferSelect)[];
  doctors: (typeof doctorsTable.$inferSelect)[];
  canUserAddAppointment: boolean;
}

const AddAppointmentButton = ({
  patients,
  doctors,
  canUserAddAppointment,
}: AddAppointmentButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleUserCanAddAppointment = () => {
    if (!canUserAddAppointment) {
      toast.error("Você não pode adicionar mais agendamentos neste mês");
      router.push("/new-subscription");
      return;
    }
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleUserCanAddAppointment}>
          <Plus />
          Novo agendamento
        </Button>
      </DialogTrigger>
      <AddAppointmentForm
        isOpen={isOpen}
        patients={patients}
        doctors={doctors}
        onSuccess={() => setIsOpen(false)}
      />
    </Dialog>
  );
};

export default AddAppointmentButton;
