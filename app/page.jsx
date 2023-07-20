import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is open source AI prompting tool for modern world to
        discover, create and share creative prompts.
      </p>

      <Feed />
    </section>
  );
};

export default Home;

/*oAuth details:
client id: 920530643183 - kur4slkudrfb5rc8emgqgrphc394l4au.apps.googleusercontent.com
client scret : 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
*/
