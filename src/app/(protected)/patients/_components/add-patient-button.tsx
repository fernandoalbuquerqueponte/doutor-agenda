"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import UpsertPatientForm from "./upsert-patient-form";

interface AddPatientButtonProps {
  canUserAddPatient: boolean;
}

const AddPatientButton = ({ canUserAddPatient }: AddPatientButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleUserCanAddPatient = () => {
    if (!canUserAddPatient) {
      toast.error("Você não pode adicionar mais pacientes neste mês");
      router.push("/new-subscription");
      return;
    }
    setIsOpen(true);
  };
	
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleUserCanAddPatient}>
          <Plus />
          Adicionar paciente
        </Button>
      </DialogTrigger>
      <UpsertPatientForm onSuccess={() => setIsOpen(false)} isOpen={isOpen} />
    </Dialog>
  );
};

export default AddPatientButton;
