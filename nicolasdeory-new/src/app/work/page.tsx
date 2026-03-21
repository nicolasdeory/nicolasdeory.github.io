import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work · Nicolás de Ory",
  description: "Selected work and experience",
};

export default function WorkPage() {
  return (
    <main className="bg-background text-foreground">
      <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-8 sm:py-14">
        <h1 className="font-display mb-8 text-3xl font-normal tracking-tight sm:mb-10 sm:text-4xl">
          What I do during the day
        </h1>

        <div className="flex flex-col gap-10">
          <p>
            I&apos;m currently working on{" "}
            <a href="https://meetcaspian.com">Caspian</a>. We&apos;re
            simplifying global trade by building a platform that streamlines
            trade compliance and duty drawback.
          </p>
          Below are my previous work experiences.
          <section className="flex flex-col gap-4">
            <h2 className="font-display text-2xl font-normal tracking-tight sm:text-3xl">
              <a href="https://homagames.com">Homa Games</a>
            </h2>
            <p>
              I worked on internal infrastructure that served millions of
              players every day. The main project I shipped was an A/B testing
              engine that supported user segmentation. It allowed ops teams to
              test new hypotheses in their games with high granularity.
            </p>
          </section>
          <section className="flex flex-col gap-4">
            <h2 className="font-display text-2xl font-normal tracking-tight sm:text-3xl">
              <a href="https://playplay.com">PlayPlay</a>
            </h2>
            <p>
              I learned what working at a product-first organization is like. My
              main projects were a mobile media uploader and the app rebranding.
              I won the company hackathon by building a command palette in two
              days.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
