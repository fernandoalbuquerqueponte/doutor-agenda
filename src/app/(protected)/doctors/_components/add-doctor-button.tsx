"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import UpsertDoctorForm from "./upsert-doctor-form";

interface AddDoctorButtonProps {
  canUserAddDoctor: boolean;
}

const AddDoctorButton = ({ canUserAddDoctor }: AddDoctorButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleUserCanAddDoctor = () => {
    if (!canUserAddDoctor) {
      toast.error("Você não pode adicionar mais médicos neste mês");
      router.push("/new-subscription");
      return;
    }
    setIsOpen(true);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleUserCanAddDoctor}>
          <Plus />
          Adicionar médico
        </Button>
      </DialogTrigger>
      <UpsertDoctorForm onSuccess={() => setIsOpen(false)} isOpen={isOpen} />
    </Dialog>
  );
};

export default AddDoctorButton;
