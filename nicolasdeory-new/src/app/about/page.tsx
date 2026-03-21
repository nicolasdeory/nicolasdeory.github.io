import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About me · Nicolás de Ory",
  description: "About Nicolás de Ory",
};

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-8 sm:py-14">
        <h1 className="font-display mb-8 text-3xl font-normal tracking-tight sm:mb-10 sm:text-4xl">
          People call me Nico
        </h1>

        <div className="flex flex-col gap-8">
          <p>
            I grew up and studied in <b>Sevilla</b>, Andalucía, Spain. I lived
            in Paris for almost three years and moved after that to San
            Francisco.
          </p>
          <p>
            I currently work at a startup called{" "}
            <a href="https://meetcaspian.com">Caspian</a> {" as "} a software
            engineer. I&apos;m becoming a better engineer every day thanks to
            the great people I work with.
          </p>
          <p>
            Outside work I dance flamenco and play music. I started dancing in
            2025 and I&apos;m currently learning at Theatre Flamenco. I started
            playing piano in 2008 and it&apos;s what I play primarily.
          </p>
        </div>
      </article>
    </main>
  );
}
