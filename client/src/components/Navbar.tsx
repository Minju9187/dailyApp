import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <Card className="bg-card flex items-center justify-between gap-6 rounded-2xl px-4 py-3">
      <Link to="/">
        <div className="text-primary cursor-pointer">Logo</div>
      </Link>

      <ul className="text-card-foreground hidden items-center gap-10 md:flex">
        <li className="text-primary font-medium">
          <a href="weather">날씨</a>
        </li>
        <li>
          <a href="calendar">캘린더</a>
        </li>
        <li>
          <a href="#pricing">추가</a>
        </li>
        <li>
          <a href="#faqs">추가</a>
        </li>
      </ul>

      <div className="flex items-center">
        <Button variant="secondary" className="hidden px-2 md:block">
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
                <Link to={page.route}>
                  <DropdownMenuItem key={page.id}>
                    {page.title}
                  </DropdownMenuItem>
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
                <Button variant="secondary" className="w-full text-sm">
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
    </Card>
  );
};

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

export default Navbar;
