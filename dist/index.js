import fs from "fs";

async function getJoke() {
  const res = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
      "User-Agent": "Writing JavaScript action GitHub Skills exercise.",
    },
  });
  const data = await res.json();
  return data.joke;
}

async function run() {
  try {
    const joke = await getJoke();
    console.log(joke);
    const outputFile = process.env.GITHUB_OUTPUT;
    if (outputFile) {
      fs.appendFileSync(outputFile, `joke=${joke}\n`);
    }
    console.log(`::set-output name=joke::${joke}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();
