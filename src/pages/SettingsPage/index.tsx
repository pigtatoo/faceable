import { Button } from "@heroui/react";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LocaleSwitcher from "../../components/LocaleSwitcher";
import { useTranslation } from "react-i18next";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-full h-full">
      <div className="p-8 flex flex-col gap-4 h-full justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="text-xl">{t("settings.heading")}</p>
            <p className="opacity-70">{t("settings.subheading")}</p>
          </div>
          <LocaleSwitcher className="w-48" />
        </div>
        <Button
          isIconOnly
          variant="light"
          onPress={() => navigate(-1)}
          className="w-max"
        >
          <Home />
        </Button>
      </div>
    </div>
  );
}

// export default function SettingsPage() {
//   return (
//     <div>
//       <p>Settings</p>
//     </div>
//   );
// }
