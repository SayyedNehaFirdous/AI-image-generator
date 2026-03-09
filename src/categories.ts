type BlogCategory = "WISSEN" | "NEWS" | "INTERVIEW";

const categorizedTitles: { title: string; category: BlogCategory }[] = [
  {
    title: "Periode und Regelschmerzen: Was ist normal? Was nicht?",
    category: "WISSEN"
  },
  {
    title: "Endometriose: Fakten statt Mythen",
    category: "WISSEN"
  },
  {
    title: "Endometriose mit künstlicher Intelligenz früher erkennen",
    category: "WISSEN"
  },
  {
    title: "Autoimmunerkrankungen und Endometriose",
    category: "WISSEN"
  },
  {
    title: "Yselty® – Neu zugelassener Wirkstoff bei Endometriose",
    category: "NEWS"
  },
  {
    title: "Speicheltest für Endometriose: Das sagen die kritischen Stimmen",
    category: "NEWS"
  },
  {
    title: "Endo Health GmbH auf dem 15. Endometriose-Kongress",
    category: "NEWS"
  },
  {
    title: "Aktuelle Forschung zu Endometriose: Ein Interview mit Henrik Marschall",
    category: "INTERVIEW"
  },
  {
    title: "Aktuelle Forschung zu Endometriose: Ein Interview mit Nisha Marshall",
    category: "INTERVIEW"
  },
  {
    title: "Mit Schmerzkalender und Ruhe durch den Alltag",
    category: "INTERVIEW"
  }
];


module.exports = { categorizedTitles };

export {};