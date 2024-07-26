
const fs = require("fs")


const main = async () => {
  const readStream = fs.createReadStream('./data/import.csv', {
    highWaterMark : 100 ,
  })

  const writeStream = fs.createWriteStream('./data/export.csv')

  readStream.on('data', (Buffer) =>{
    console.log('>>> DATA:');
    console.log(Buffer.toString());   // here We convert buffer Value to a String

    writeStream.write(Buffer)

  })

  readStream.on('end', () =>{
    console.log('Stream ended');

    writeStream.end()
  })
}

main()