import Modal from "./Modal";
import gitHubIcon from "@/assets/github-mark-white.png";
import { ModalProps } from "@/types/Modal";
import { Button } from "../ui/button";

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI;

const handleGitHubLogin = () => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user`;
  window.location.href = githubAuthUrl;
};

export default function LoginModal({ open, closeModal }: ModalProps) {
  return (
    <Modal open={open} closeModal={closeModal}>
      <p className="mb-4 text-center text-xl">로그인</p>
      <div>
        <Button
          className="flex items-center justify-center gap-2 rounded-md bg-black pt-3 pr-6 pb-3 pl-6 text-white transition"
          onClick={handleGitHubLogin}
        >
          <img src={gitHubIcon} alt="Github" className="h-5 w-5" />
          <span className="flex-grow text-sm text-white">
            Login with Github
          </span>
        </Button>
      </div>
    </Modal>
  );
}
