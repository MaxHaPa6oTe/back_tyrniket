import XLSX from 'xlsx';

function AddOldWorkers() {
    const workbook = XLSX.readFile('./OldWorkers.xlsx');
    const stranicu = workbook.SheetNames;
    const stranica = workbook.Sheets[stranicu[0]];
    const kolichestvoStolbcov = 7;
    for (let stolbec = 0; stolbec < kolichestvoStolbcov; i++) {
        const fio = stranica[`A${i}`].v;
        const dataR = stranica[`B${i}`].v;
        //и т.д.
        console.log({
            fio:fio,dataR:dataR
        })
    }
}