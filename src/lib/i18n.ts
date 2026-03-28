export type Locale = "tr" | "en" | "es" | "fr";

export const LOCALES: { code: Locale; label: string }[] = [
  { code: "tr", label: "Türkçe" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
];

export const translations: Record<Locale, Record<string, string>> = {
  tr: {
    title: "Multi TV",
    settings: "Ayarlar",
    channelCount: "Kanal Sayısı",
    channel: "Kanal",
    videoUrl: "YouTube Video URL veya ID",
    apply: "Uygula",
    close: "Kapat",
    addChannel: "Kanal Ekle",
    resetDefaults: "Varsayılana Sıfırla",
    fullscreen: "Tam Ekran",
    mute: "Sesi Kapat",
    unmute: "Sesi Aç",
    language: "Dil",
    urlPlaceholder: "YouTube URL veya video ID girin",
  },
  en: {
    title: "Multi TV",
    settings: "Settings",
    channelCount: "Channel Count",
    channel: "Channel",
    videoUrl: "YouTube Video URL or ID",
    apply: "Apply",
    close: "Close",
    addChannel: "Add Channel",
    resetDefaults: "Reset Defaults",
    fullscreen: "Fullscreen",
    mute: "Mute",
    unmute: "Unmute",
    language: "Language",
    urlPlaceholder: "Enter YouTube URL or video ID",
  },
  es: {
    title: "Multi TV",
    settings: "Ajustes",
    channelCount: "Número de canales",
    channel: "Canal",
    videoUrl: "URL o ID de YouTube",
    apply: "Aplicar",
    close: "Cerrar",
    addChannel: "Agregar canal",
    resetDefaults: "Restablecer",
    fullscreen: "Pantalla completa",
    mute: "Silenciar",
    unmute: "Activar sonido",
    language: "Idioma",
    urlPlaceholder: "Ingrese URL o ID de YouTube",
  },
  fr: {
    title: "Multi TV",
    settings: "Paramètres",
    channelCount: "Nombre de chaînes",
    channel: "Chaîne",
    videoUrl: "URL ou ID YouTube",
    apply: "Appliquer",
    close: "Fermer",
    addChannel: "Ajouter une chaîne",
    resetDefaults: "Réinitialiser",
    fullscreen: "Plein écran",
    mute: "Couper le son",
    unmute: "Activer le son",
    language: "Langue",
    urlPlaceholder: "Entrez l'URL ou l'ID YouTube",
  },
};

export function t(locale: Locale, key: string): string {
  return translations[locale]?.[key] ?? key;
}

export function extractVideoId(input: string): string {
  // Full YouTube URL
  const urlMatch = input.match(
    /(?:youtube\.com\/(?:watch\?v=|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (urlMatch) return urlMatch[1];
  // Raw 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(input.trim())) return input.trim();
  return input.trim();
}
