import Image from "next/image";
import bridgePic from "@/assets/pic/bridge.jpeg";

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-8 sm:py-14">
        <h1 className="sr-only">Nicolás de Ory</h1>

        <p className="mb-8 md:mb-10">
          I&apos;m a software engineer born in Sevilla, Spain. I love creating
          things from scratch.
        </p>

        <figure className="mb-10 m-0 md:mb-12">
          <Image
            src={bridgePic}
            alt="Bridge"
            className="h-auto w-full border border-black/10 dark:border-white/15"
            sizes="(max-width: 768px) 100vw, 48rem"
            priority
          />
        </figure>
      </article>
    </main>
  );
}
