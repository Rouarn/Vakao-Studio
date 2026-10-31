type Theme = "light" | "dark";

export function useTheme() {
  const theme = useState<Theme>("theme", () => "light");
  const ready = useState<boolean>("theme-ready", () => false);

  const apply = (value: Theme) => {
    theme.value = value;
    if (import.meta.client) {
      document.documentElement.dataset.theme = value;
      try {
        localStorage.setItem("vakao-theme", value);
      } catch {
        // ignore storage failures
      }
    }
  };

  const toggle = () => {
    apply(theme.value === "dark" ? "light" : "dark");
  };

  onMounted(() => {
    const current = document.documentElement.dataset.theme;
    if (current === "dark" || current === "light") {
      theme.value = current;
    } else {
      theme.value = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      apply(theme.value);
    }
    ready.value = true;
  });

  return { theme, ready, apply, toggle };
}
