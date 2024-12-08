import Link from "next/link";
import { draftMode } from "next/headers";

import Date from "./date";
import CoverImage from "./cover-image";
import Avatar from "./avatar";
import MoreStories from "./more-stories";

import { getAllPosts } from "@/lib/api";
import { CMS_NAME, CMS_URL } from "@/lib/constants";

function Intro() {
  return (
    <div>
      <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          Jenny McClaine's Vercel Hosted Contentful Blog Demo.
        </h1>
        <h2 className="text-left text-lg mt-5 md:pl-8">
          This statically generated blog example site serves "statically generated" pages precompiled at build time vs. compiled on the fly when a client browser makes a request for a URL. Precompiled pages load faster in the browser and should be used whenever possible for optimized performance and less server side resource overhead.
        </h2>
      </section>
      <section className="flex-col flex items-left md:justify-between mt-16 mb-16 md:mb-12">
        <h3>
          This site was created by Jenny McClaine using {" "}
          <a
            href="https://nextjs.org/"
            target="new"
            className="underline hover:text-success duration-200 transition-colors"
          >
            Next.js
          </a>{" "}
          and{" "}
          <a
            href={CMS_URL}
            className="underline hover:text-success duration-200 transition-colors"
          >
            {CMS_NAME}
          </a>
          .
        </h3>
        <h3 className="mt-8">
          This blog is hosted on the Vercel cloud platform {" "}
          <a
            href="https://vercel.com/"
            target="new"
            className="underline hover:text-success duration-200 transition-colors"
          >
            Vercel Hosting
          </a>
          .
        </h3>
      </section>
    </div>
  );
}

function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: {
  title: string;
  coverImage: any;
  date: string;
  excerpt: string;
  author: any;
  slug: string;
}) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
      </div>
    </section>
  );
}

export default async function Page() {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(isEnabled);
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <div className="container mx-auto px-5">
      <Intro />
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      <MoreStories morePosts={morePosts} />
    </div>
  );
}
