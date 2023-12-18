import PDFDocument from 'pdfkit';
import fs from 'fs';
import { resolve } from 'path';
import { rejects } from 'assert';

export const createReceiptPDF = (details,path) =>new Promise((resolve, reject)=>{
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(path);
    doc.pipe(writeStream);
    doc.fontSize(20).text('Booking Details',{align:"center"});
    doc.moveDown();
    doc.fontSize(14);
    Object.entries(details).forEach(([key,value])=>{
        doc.text(`${key}: ${value}`);
        doc.moveDown();
    });
    doc.end();
    writeStream.on('finish',()=> resolve());
    writeStream.on('error',reject);
});