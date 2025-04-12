import { useTranslation } from "react-i18next";

/**
 * LanguageSwitcher component
 * Allows the user to toggle between "es" and "en" languages.
 */
export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="text-sm px-3 py-1 border rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
    >
      {i18n.language === "es" ? "EN" : "ES"}
    </button>
  );
};
