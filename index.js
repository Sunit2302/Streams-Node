const fs = require("fs");
const csv = require("csvtojson");
const { Transform } = require("stream");
const { error } = require("console");

const main = async () => {
  const readStream = fs.createReadStream("./data/import.csv");

  const writeStream = fs.createWriteStream("./data/export.csv");

  const myTransform = new Transform({
    objectMode: true,
    transform(chunk, enc, callback) {
      console.log(">>> Chunk:", chunk);
      callback(null);
    },
  });

  readStream
    .pipe(
      csv(
        {
          delimiter: ";",
        },
        { objectMode: true }
      )
    )
    .pipe(
      myTransform
    )
    .on("data", (data) => {
      console.log(">>> Data:");
      console.log(data);
    })
    .on("error", (error) => {
      console.error("Stream error:", error);
    })
    .on("end", () => {
      console.log("Stream ended!");
    });
};

main();
