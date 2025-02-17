import prisma from "#/lib/prisma";
import { nFormatter } from "#/lib/utils";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import TestimonialsMobile from "./testimonials-mobile";
import Tweet from "#/ui/tweet";
import { Tweet as TweetProps } from "react-tweet/api";
import { getAndCacheTweet } from "#/lib/twitter";

const tweets = [
  "1631671657617059842",
  "1573744854655533069",
  "1644155001034657792",
  "1646599529796456469",
  "1704382884340027663",
  "1702990934558879779",

  "1704950736071598507",
  "1657473320957227010",
  "1582956754425421825",
  "1574639172605816832",
  "1586745532386578433",
  "1704243979460469097",
  "1706368025681858855",

  "1702714036398297321",
  "1675191509430444032",
  "1632125000386854912",
  "1581017931043196928",
  "1643814463131332609",
  "1663567242616004610",
  "1696615753536114736",
];

export default async function Testimonials() {
  const [userCount, tweetsData] = await Promise.all([
    prisma.user.count(),
    (
      await Promise.all(tweets.map((id) => getAndCacheTweet(id)))
    ).filter((t) => t) as TweetProps[],
  ]);

  return (
    <MaxWidthWrapper className="pt-20">
      <div className="mx-auto max-w-md text-center sm:max-w-xl">
        <h2 className="font-display text-4xl font-extrabold leading-tight text-black sm:text-5xl sm:leading-tight">
          Loved by{" "}
          <span className="bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
            {nFormatter(userCount)} users
          </span>
        </h2>
        <p className="mt-5 text-gray-600 sm:text-lg">
          Don't take it from us – here's what our users have to say about Dub.
        </p>
      </div>
      <TestimonialsMobile tweetsData={tweetsData} />
      <div className="hidden space-y-6 py-8 sm:block sm:columns-2 sm:gap-6 xl:columns-3">
        {tweetsData.filter(Boolean).map((tweet, idx) => (
          <Tweet
            key={idx}
            data={tweet || null}
            className={
              // this is a bit hacky but it allows us to have a 3-column mosaic layout on desktop
              // it basically says "if the card is NOT in the middle column, push it down
              idx <= 5 || idx >= 13 ? "relative lg:top-12" : ""
            }
          />
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
