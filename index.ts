import fetch from 'node-fetch'
import { ExportToCsv } from 'export-to-csv';
import fs from 'fs'


const csvOptions = { 
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true, 
  showTitle: true,
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
};


fetch('https://gist.githubusercontent.com/jessejanderson/09155afe313914498a32baa477584fae/raw/48ece7cdc4cb2224bcb8ebed2cf45e2c7c50d374/schools.md')
.then(res => res.text())
.then(data => {
  let schools = data.match(/(?<=\*\*)(\w|\s)+(?=\*\*)/g) as Array<any>
  if(schools) {  
    console.log(schools.length)  
    schools = schools.map(s => {return{Schools:s}})
    const csvExporter = new ExportToCsv(csvOptions);
    let csv = csvExporter.generateCsv(schools,true);
    fs.writeFileSync('./out.csv',csv)
  }
})
.catch(e => console.error(e))