import { Trophy } from "lucide-react";
import Footer from "@/components/Footer";
import { achievements } from "@/data/achievements";

export default function Achievement() {
    return (
        <div className="min-h-screen flex flex-col items-center p-4 sm:p-8 font-share-tech bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-purple-dark/20 via-brand-dark to-brand-dark">
            <main className="flex flex-col gap-16 w-full max-w-4xl items-center z-10 flex-grow">

                <section className="w-full mt-12 text-center space-y-8">
                    <h1 className="text-3xl md:text-5xl font-press-start text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-green drop-shadow-sm leading-tight py-4">
                        ACHIEVEMENTS
                    </h1>
                    <div className="h-1 w-24 bg-brand-green mx-auto rounded-full"></div>
                </section>

                <section className="w-full px-4 text-brand-light space-y-6">
                    {achievements.map((achievement) => (
                        <div key={achievement.id} className="bg-brand-dark/50 border border-brand-green/30 rounded-xl p-6 md:p-8 backdrop-blur-sm hover:border-brand-green/60 transition-colors duration-300">
                            <div className="flex flex-col md:flex-row gap-6 items-center">
                                <div className="p-4 bg-brand-green/10 rounded-full">
                                    <Trophy className="w-12 h-12 text-brand-green" />
                                </div>
                                <div className="text-center md:text-left space-y-2 w-full">
                                    <h2 className="text-2xl font-bold text-brand-light">{achievement.title}</h2>
                                    <p className="text-xl text-brand-purple font-press-start text-sm">{achievement.rank}</p>
                                    <p className="text-brand-light/60 font-share-tech mt-2">
                                        {achievement.date}
                                    </p>

                                    {achievement.roster && achievement.roster.length > 0 && (
                                        <div className="pt-6 mt-4 border-t border-brand-green/20 w-full">
                                            <h3 className="text-sm font-press-start text-brand-green mb-4 text-center md:text-left">ROSTER:</h3>
                                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                                {achievement.roster.map((name) => (
                                                    <span
                                                        key={name}
                                                        className="px-3 py-1 bg-brand-purple/10 border border-brand-purple/40 rounded-full text-sm text-brand-light/90 hover:bg-brand-purple/20 hover:border-brand-purple/60 transition-colors cursor-default"
                                                    >
                                                        {name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

            </main>
            <Footer />
        </div>
    );
}
