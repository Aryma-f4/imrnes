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
];
