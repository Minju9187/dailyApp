import { ReactNode } from "react";
import { Button } from "../ui/button";

type ModalProps = {
  open: boolean;
  closeModal: () => void;
  children: ReactNode;
};

export default function Modal({ open, closeModal, children }: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30"
      onClick={closeModal}
    >
      <div
        className="relative rounded-lg bg-white px-10 py-3"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <Button
          variant="secondary"
          className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center p-3"
          onClick={closeModal}
        >
          <p>x</p>
        </Button>
      </div>
    </div>
  );
}
