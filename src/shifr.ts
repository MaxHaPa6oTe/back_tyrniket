export default function convert_UID(uid_1C:any)
{
let masByte = []; // Массив составляющих UID

let int = uid_1C; // Целочисленное деление
let ost = 0; // Остаток от деления

let uid = 0; // Конвертированный UID

for(let i = 0;i<8; i++)
{
ost = int % 16;
int = Math.trunc(int / 16);
masByte.push(ost);
}

uid = masByte[1];
uid = uid * 16 + masByte[0];
uid = uid * 16 + masByte[3];
uid = uid * 16 + masByte[2];
uid = uid * 16 + masByte[5];
uid = uid * 16 + masByte[4];
uid = uid * 16 + masByte[7];
uid = uid * 16 + masByte[6];

return uid;
}
