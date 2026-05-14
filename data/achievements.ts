export interface Achievement {
    id: string;
    title: string;
    rank: string;
    date: string;
    roster: string[];
}

export const achievements: Achievement[] = [
    {
        id: "atc-winterfest-2026",
        title: "ATC CTF Winterfest 2026",
        rank: "3rd Place Winner",
        date: "1 February 2026",
        roster: ["Worldsavior/Aryma", "Mytheclipse", "qwra/Pwarwq", "ROPshade"],
    },
  {
        id: "icoa-indonesia-qualifier-2026",
        title: "ICOA Sydney Australia Indonesia Qualifier 2026",
        rank: "1st Place Winner",
        date: "10 May 2026",
        roster: [ "ROPshade"],
    },
      {
        id: "cyber-breaker-2026",
        title: "Cyber Breaker 2026 - Top 2 Kalimantan Region",
        rank: "2nd Place",
        date: "9 May 2026",
        roster: [ "ROPshade", "qwra/Pwarwq"],
    },
];
