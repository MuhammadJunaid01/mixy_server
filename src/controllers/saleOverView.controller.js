const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const Products = require("../models/products.model");
const doc = new PDFDocument();
const saleOverview = async (req, res, next) => {
  try {
    const products = await Products.find({});
    /* Creating a pdf file and downloading it. */
    if (products) {
      doc.pipe(
        fs.createWriteStream(
          path.join(__dirname, "../../public", "example.pdf")
        )
      );
      doc.fontSize(25).text("products", 100, 100);
      products.map((data) => {
        doc.fontSize(25).text(data.description, 100, 100);
        doc.moveDown();

        doc.moveDown();
        doc.fontSize(20).text(data.stock);
      });
      doc.end();
      const file = path.join(__dirname, "../../public", "example.pdf");
      setTimeout(() => {
        res.download(file, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("success");
          }
        });
      }, 3000);
    }
  } catch (error) {
    next(error.message);
  }
};
module.exports = saleOverview;
