import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { createPortal } from "react-dom";
import useModal from "@/hooks/useModal";
import LoginModal from "./Modal/LoginModal";

const landings = [
  {
    id: 1,
    title: "날씨",
    route: "/weather",
  },
  {
    id: 2,
    title: "캘린더",
    route: "/calendar",
  },
  {
    id: 3,
    title: "추가",
    route: "#ai-content-landing",
  },
  {
    id: 4,
    title: "추가",
    route: "#new-intro-landing",
  },
];

const Navbar = () => {
  const {
    open: loginModal,
    openModal: openLoginModal,
    closeModal: closeLoginModal,
  } = useModal();

  return (
    <Card className="bg-card flex items-center justify-between gap-6 rounded-2xl">
      <Link to="/">
        <div className="text-primary cursor-pointer">Logo</div>
      </Link>

      <ul className="text-card-foreground hidden items-center gap-10 md:flex">
        <li className="text-primary font-medium">
          <Link to="/weather">날씨</Link>
        </li>
        <li>
          <Link to="/calendar">캘린더</Link>
        </li>
        <li>
          <Link to="#pricing">추가</Link>
        </li>
        <li>
          <Link to="#faqs">추가</Link>
        </li>
      </ul>

      <div className="flex items-center">
        <Button
          variant="secondary"
          className="hidden px-2 md:block"
          onClick={openLoginModal}
        >
          Login
        </Button>
        <Button className="mr-2 ml-2 hidden md:block">Get Started</Button>

        <div className="mr-2 flex items-center gap-2 md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-md px-2 py-2">Pages</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {landings.map((page) => (
                <Link to={page.route} key={"landing" + page.id}>
                  <DropdownMenuItem>{page.title}</DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5 scale-100 rotate-0" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Button
                  variant="secondary"
                  className="w-full text-sm"
                  onClick={openLoginModal}
                >
                  Login
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button className="w-full text-sm">Get Started</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ModeToggle />
      </div>
      {createPortal(
        <LoginModal open={loginModal} closeModal={closeLoginModal} />,
        document.body,
      )}
    </Card>
  );
};

export default Navbar;
