export interface Channel {
  id: string;
  name: string;
  videoSlug: string;
  country: string;
}

export const DEFAULT_CHANNELS: Channel[] = [
 { id: "ntv",         name: "NTV",          videoSlug: "pqq5c6k70kk", country: "TR" },
  { id: "haberturk",   name: "HaberGlobal",    videoSlug: "VtDBzxAByA0", country: "TR" },
  { id: "haberglobal", name: "CNN",  videoSlug: "6N8_r2uwLEc", country: "TR" },
  { id: "trthaber",    name: "TRT Haber",     videoSlug: "3XHebGJG0bc", country: "TR" },
  { id: "tv100",       name: "TV 100",        videoSlug: "ZYXC7wMKtlQ", country: "TR" },
  { id: "halktv",      name: "Halk TV",       videoSlug: "3aBZxzCPFMU", country: "TR" },
  { id: "tv24",        name: "24 TV",         videoSlug: "zjKgMTJvKPo", country: "TR" },
  { id: "tgrt",        name: "TGRT Haber",    videoSlug: "SSGF_e6KLVU", country: "TR" },
  { id: "krttv",       name: "KRT TV",        videoSlug: "Bsxag50fqWU", country: "TR" },
  { id: "tele1",       name: "TELE 1",        videoSlug: "6LKnB7LlTBE", country: "TR" },
  { id: "bengutv",     name: "Bengü Türk",    videoSlug: "vCjcMYNMBpk", country: "TR" },
  { id: "bloomberght", name: "Bloomberg HT",  videoSlug: "rtNUfysGZtM", country: "TR" },
  { id: "ulusal",      name: "Ulusal Kanal",  videoSlug: "bNhVNkqRRho", country: "TR" },
  { id: "artitv",      name: "Artı TV",       videoSlug: "S2MVQr7H49g", country: "TR" },
  { id: "tvnet",       name: "TVNET",         videoSlug: "0TuS0Jv_0Is", country: "TR" },
  { id: "ulketv",      name: "Ülke TV",       videoSlug: "D3oMFVJ7xXA", country: "TR" },
  { id: "flashhaber",  name: "Flash Haber",   videoSlug: "ADVlH4FN37s", country: "TR" },
];

export const GRID_OPTIONS = [1, 2, 4, 6, 9, 16, 25] as const;
export type GridSize = (typeof GRID_OPTIONS)[number];

export const GRID_COLS: Record<GridSize, number> = {
  1:  1,
  2:  2,
  4:  2,
  6:  3,
  9:  3,
  16: 4,
  25: 5,
};
