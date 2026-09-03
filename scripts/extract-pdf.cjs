const fs = require("fs");
const { PDFParse } = require("pdf-parse");

async function main() {
  const fileBuf = fs.readFileSync("C:/Users/ENS/.gemini/antigravity/scratch/pedoman_surat.pdf");
  const uint8 = new Uint8Array(fileBuf);
  const parser = new PDFParse(uint8);
  await parser.load();
  const text = await parser.getText();
  fs.writeFileSync("C:/Users/ENS/.gemini/antigravity/scratch/pedoman_extracted.txt", text.pages.map(p => p.text).join("\n--- PAGE ---\n"), "utf-8");
  console.log("Success! Total pages extracted:", text.pages.length);
}

main().catch(err => {
  console.error("PDFParse err:", err);
});
