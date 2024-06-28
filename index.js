const userName = document.getElementById("name");
const userTarikh = document.getElementById("tarikh");
const userRakam = document.getElementById("rakam");
const userPhoto = document.getElementById("photo");
const submitBtn = document.getElementById("submitBtn");

const { PDFDocument, rgb, degrees } = PDFLib;


const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

submitBtn.addEventListener("click", () => {
  const val1 = capitalize(userName.value);
  const val2 = capitalize(userTarikh.value);
  const val3 = capitalize(userRakam.value);
  const val4 = capitalize(userPhoto.value);

  //check if the text is empty or not
  if (val1.trim() !== "" && userName.checkValidity(),userTarikh.checkValidity(),userRakam.checkValidity(),userPhoto.checkValidity()) {
    // console.log(val);
    generatePDF(val1,val2,val3,val4);
  } else {
    userName.reportValidity();
    userTarikh.reportValidity();
  }
});

const generatePDF = async (name,tarikh,rakam,photo) => {
  const existingPdfBytes = await fetch("./thankyou_msg.pdf").then((res) =>
    res.arrayBuffer()
  );

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  //get font
  const fontBytes = await fetch("./SanChez-Regular.ttf").then((res) =>
    res.arrayBuffer()
  );

  // Embed our custom font in the document
  const SanChezFont = await pdfDoc.embedFont(fontBytes);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Draw a string of text diagonally across the first page
  firstPage.drawText(name, {
    x: 258,
    y: 369,
    size: 25,
    font: SanChezFont,
    color: rgb(0, 0.53, 0.71),
  });
  firstPage.drawText(tarikh, {
    x: 705,
    y: 584,
    size: 17,
    font: SanChezFont,
    color: rgb(0.99, 0.99, 0.99),
  });
  firstPage.drawText(rakam, {
    x: 258,
    y: 321,
    size: 22,
    font: SanChezFont,
    color: rgb(0, 0.53, 0.71),
  });
  firstPage.drawText(photo, {
    x: 267,
    y: 294,
    size: 3,
    font: SanChezFont,
    color: rgb(0, 0.53, 0.71),
  });
  // x: 258,
  //   y: 369

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  console.log("Done creating");

  // this was for creating uri and showing in iframe

  // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  // document.getElementById("pdf").src = pdfDataUri;

  var file = new File(
    [pdfBytes],
    "SNSSA Donation Slip.pdf",
    {
      type: "application/pdf;charset=utf-8",
    }
  );
 saveAs(file);
};



// init();
