import { Button } from "@heroui/react";
import { Settings, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const links = [
    {
      href: "https://github.com/Wind-Explorer/blank-tauri-app",
      name: "github",
      path: ".com/Wind-Explorer/blank-tauri-app",
    },
    {
      href: "https://reactrouter.com/start/declarative/routing",
      name: "reactrouter",
      path: ".com/start/declarative/routing",
    },
    {
      href: "https://www.i18next.com/overview/getting-started",
      name: "i18next",
      path: ".com/overview/getting-started",
    },
    {
      href: "https://www.heroui.com/docs/components",
      name: "heroui",
      path: ".com/docs/components",
    },
    { href: "https://tailwindcss.com/", name: "tailwindcss", path: ".com" },
    { href: "https://lucide.dev/icons", name: "lucide", path: ".dev/icons" },
    { href: "https://tauri.app/", name: "tauri", path: ".app" },
  ];

  return (
    <div className="w-full h-[1000px]">
      <div className="p-8 h-full flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-6">
          <img
            src="https://avatars.githubusercontent.com/u/66894537"
            alt="Github Profile Image"
            className="w-16 h-16 rounded-full border border-foreground/25"
          />
          <div className="flex flex-col gap-2">
            <span className="flex flex-row gap-2 items-center">
              <p className="text-xl">{t("home.heading")}</p>
              <Sparkles size={23} color="orange" />
            </span>
            <div className="flex flex-col text-sm *:opacity-70">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  className="group"
                >
                  <b>{link.name}</b>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {link.path}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between items-center">
          <Button
            isIconOnly
            variant="light"
            onPress={() => {
              navigate("/settings");
            }}
          >
            <Settings />
          </Button>
          <span>
            Edit{" "}
            <code className="px-2 py-1 mx-1 rounded-md bg-neutral-500/25">
              HomePage.tsx
            </code>{" "}
            to get started
          </span>
        </div>
      </div>
    </div>
  );
}

// export default function HomePage() {
//   return (
//     <div>
//       <p>Home</p>
//     </div>
//   );
// }
