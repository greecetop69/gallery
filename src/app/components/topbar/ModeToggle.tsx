import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [clientTheme, setClientTheme] = useState<string | undefined>();

  useEffect(() => {
    setClientTheme(theme);
  }, [theme]);

  if (clientTheme === undefined) return null;

  return (
    <Button
      onClick={() => setTheme(clientTheme === "dark" ? "light" : "dark")}
      variant="outline"
      size="icon"
      className="relative"
    >
      {clientTheme === "dark" ? (
        <Sun className="h-6 w-6 transition-transform duration-300 ease-in-out" />
      ) : (
        <Moon className="h-6 w-6 transition-transform duration-300 ease-in-out" />
      )}
    </Button>
  );
}
