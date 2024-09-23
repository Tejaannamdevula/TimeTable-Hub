import Link from "next/link";
import { Button } from "./ui/button";
import { Inter } from "next/font/google";

// Configure Inter with specific options
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const Navbar = () => {
  return (
    <div className={inter.className}>
      <header className="flex items-center justify-between px-6 py-4 ">
        <div className="flex items-center space-x-2">
          <Link href={"/"} className="text-2xl font-bold">
            TimeTable
          </Link>
          <span className="px-2 py-1 font-sans text-xs font-semibold text-green-600 bg-green-100 rounded-full">
            BETA
          </span>
        </div>

        <nav>
          <ul className="flex space-x-4">
            {["Schedule", "Features", "Help"].map((item, index) => (
              <li key={index}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="text-sm font-semibold text-gray-600 hover:text-cal-black"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Button
          variant={"default"}
          className="bg-cal-black  hover:text-gray-300 text-cal-white rounded-full"
        >
          LOGIN
        </Button>
      </header>
    </div>
  );
};
