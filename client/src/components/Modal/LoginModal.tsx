import Modal from "./Modal";
import gitHubIcon from "@/assets/github-mark-white.png";
import { ModalProps } from "@/types/Modal";
import { Button } from "../ui/button";

export default function LoginModal({ open, closeModal }: ModalProps) {
  return (
    <Modal open={open} closeModal={closeModal}>
      <p className="mb-4 text-center text-xl">로그인</p>
      <div>
        <Button className="flex items-center justify-center gap-2 rounded-md bg-black pt-3 pr-6 pb-3 pl-6 text-white transition">
          <img src={gitHubIcon} alt="Github" className="h-5 w-5" />
          <span className="flex-grow text-sm text-white">
            Login with Github
          </span>
        </Button>
      </div>
    </Modal>
  );
}
