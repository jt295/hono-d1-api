const loremIpsum = require("lorem-ipsum").loremIpsum;

// https://github.com/lukehaas/getlorem
const lorem = loremIpsum({
  count: 10, // Number of "words", "sentences", or "paragraphs"
  format: "html", // "plain" or "html"
  paragraphLowerBound: 3, // Min. number of sentences per paragraph.
  paragraphUpperBound: 7, // Max. number of sentences per paragarph.
  random: Math.random, // A PRNG function
  sentenceLowerBound: 5, // Min. number of words per sentence.
  sentenceUpperBound: 15, // Max. number of words per sentence.
  suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
  units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
});

async function genRandomImage() {
  const imageSources = [
    "https://coffee.alexflipnote.dev/random.json",
    "https://random-d.uk/api/random",
  ];
  const option = Math.floor(Math.random() * 2);

  if (option === 1) {
    const res = await fetch(imageSources[option]).then((res) => res.json());
    return res.url;
  } else {
    const res = await fetch(imageSources[option]).then((res) => res.json());
    return res.file;
  }
}

async function createPost(title, description, author) {
  const imageUrl = await genRandomImage();
  const content = lorem;

  return {
    title,
    description,
    image: imageUrl,
    content,
    author,
  };
}

function genAuthor() {
  const authors = [
    "Bob",
    "Jim",
    "Samantha",
    "Teresa",
    "Phillip",
    "Ben",
    "Laura",
    "Holly",
  ];

  return authors[Math.floor(Math.random() * authors.length)];
}

const promises = [];

for (let i = 0; i < 100; i++) {
  const post = createPost(
    `A test post ${i}`,
    `A description for post ${i}`,
    genAuthor()
  );
  promises.push(post);
}

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

Promise.all(promises).then((values) => {
  values.forEach((value) => {
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(value),
      redirect: "follow",
    };

    fetch("https://hono-d1-api.jamestrivett.workers.dev/posts", requestOptions);
    // fetch("http://localhost:8787/posts", requestOptions);
  });
});
