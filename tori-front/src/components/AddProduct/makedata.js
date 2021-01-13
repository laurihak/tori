function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateSellerName() {
  const name1 = [
    "Matti",
    "Lauri",
    "Pekka",
    "Taru",
    "Sonja",
    "Juho",
    "Niko",
    "Elon",
  ];
  const name2 = [
    "Hakala",
    "Nieminen",
    "Musk",
    "Koivisto",
    "Halonen",
    "Raikkonen",
    "Ahtisaari",
    "Ahtosalo",
  ];

  let name =
    name1[getRandomInt(0, name1.length)] +
    " " +
    name2[getRandomInt(0, name2.length)];
  console.log(name);
  return name;
}
function generateProductName() {
  const name1 = [
    "Puhelin",
    "Auto",
    "Kello",
    "Pyykkinaru",
    "Huppari",
    "Hapankaali",
    "Koru",
    "Pipo",
  ];

  let name = name1[getRandomInt(0, name1.length)];
  console.log(name);
  return name;
}
function generateLocation() {
  const name1 = [
    "Uusimaa",
    "Varsinais-Suomi",
    "Satakunta",
    "Kanta-Häme",
    "Pirkanmaa",
    "Päijät-Häme",
    "Kymenlaakso",
    "Etelä-Karjala",
    "Etelä-Savo",
    "Pohjois-Savo",
    "Pohjois-Karjala",
    "Keski-Suomi",
    "Etelä-Pohjanmaa",
    "Pohjanmaa",
    "Keski-Pohjanmaa",
    "Pohjois-Pohjanmaa",
    "Kainuu",
    "Lappi",
    "Ahvenanmaa",
  ];

  let name = name1[getRandomInt(0, name1.length)];
  console.log(name);
  return name;
}

function generateAddress() {
  const name1 = [
    "Uusimaa 321",
    "Varsinais-Suomi 321",
    "Satakunta 321",
    "Kanta-Häme 321",
    "Pirkanmaa 321",
    "Päijät-Häme 312",
    "Kymenlaakso 321",
    "Etelä-Karjala 321",
    "Etelä-Savo 312",
    "Pohjois-Savo 312",
    "Pohjois-Karjala 312",
    "Keski-Suomi 312",
    "Etelä-Pohjanmaa 312",
    "Pohjanmaa 321",
    "Keski-Pohjanmaa 312",
    "Pohjois-Pohjanmaa 312",
    "Kainuu 312",
    "Lappi 312",
    "Ahvenanmaa 321",
  ];

  let name = name1[getRandomInt(0, name1.length)];
  console.log(name);
  return name;
}

function generateSellType() {
  const name1 = ["Posti", "Nouto"];

  let name = name1[getRandomInt(0, name1.length)];
  console.log(name);
  return name;
}

function generateDescription() {
  const string = `Ostetaan/noudetaan
  -autonromut(rom.tod) Huom! Romutuspalkkio 1.12 alkaen
  -maatalousromut
  Yms yms
  Nopea nouto/käteismaksu`;

  const test = string.toString();
  const name1 = [
    "Manuaalivetoinen kello, kaliiberi 2531, ref 548A987, teräs/kullatut kuoret ja hopeanvärinen kellotaulu, Hirschin ruskea Toronto-ranneke, 3atm roisketiiviys, kellon takapohjassa on kaiverrus Kello on huollettu ja sille myönnetään kahden vuoden käyntitakuu. Kellon mukana tulee A4-huoltodokumentti sisältäen tiiviys- ja käyntiraportit.",
    "Vuokrataan paritalo Levi, Kätkänharju 1. Levin keskustaan kävellen 800m. Ladut ja rinteet ja muut palvelut ihan vieressä. Tilaa 8-10 hlö, kolmessa kerroksessa. Katso lisää Nettimökki ID 6462 ja 6625. Lisää kuvia ja tietoja löytyy Nettimökistä. Tai kysy minulta suoraan P040-5952472 Toni",
    test,
  ];

  let name = name1[getRandomInt(0, name1.length + 1)];
  console.log("description", name);
  return name;
}

export {
  generateSellerName,
  generateProductName,
  generateLocation,
  generateAddress,
  generateSellType,
  generateDescription,
};
