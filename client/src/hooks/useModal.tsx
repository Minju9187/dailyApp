import { useState } from "react";

export default function useModal() {
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }
  return { open, openModal, closeModal };
}
