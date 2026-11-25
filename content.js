// Libro III «Los dueños del Sol». La lista de capítulos la escribe
// C:\dev\qwen3-tts\libro3\hacer_web_l3.py: copia los mp3 finales a audio/ y
// mide cada duración con ffprobe, no se estima. Por ahora, Partes I y II.
window.BOOK_DATA = {
  site: {
    saga: "El ciclo inmóvil",
    book: "Los dueños del Sol",
    volume: "Libro III",
    author: "Escandar Giadach",
    audioBaseUrl: "audio/",
    audioVersion: 1,
    frontMatter: null
  },
  chapters: [
    { number: 1, title: "Lo que el Muro separa", part: "Parte I", file: "01-de-vuelta.mp3", seconds: 2080 },
    { number: 2, title: "La brecha", part: "Parte I", file: "02-la-brecha.mp3", seconds: 2539 },
    { number: 3, title: "Los que quedan", part: "Parte I", file: "03-los-que-quedan.mp3", seconds: 3175 },
    { number: 4, title: "Las marcas azules", part: "Parte I", file: "04-los-que-estaban-debajo.mp3", seconds: 3123 },
    { number: 5, title: "Otra versión oficial", part: "Parte I", file: "05-el-regreso.mp3", seconds: 3103 },
    { number: 6, title: "Lo necesario", part: "Parte I", file: "06-shuren.mp3", seconds: 3430 },
    { number: 7, title: "La sangre Aurelian", part: "Parte I", file: "07-la-sangre-aurelian.mp3", seconds: 3156 },
    { number: 8, title: "Vahlerianos", part: "Parte I", file: "08-vahlerianos.mp3", seconds: 2540 },
    { number: 9, title: "Algo que perder", part: "Parte I", file: "09-el-nombre-prestado.mp3", seconds: 2657 },
    { number: 10, title: "La luz roja", part: "Parte I", file: "10-la-luz-roja.mp3", seconds: 2451 },
    { number: 11, title: "El peso de la fuerza", part: "Parte II", file: "11-el-peso-de-la-fuerza.mp3", seconds: 2428 },
    { number: 12, title: "Injertos", part: "Parte II", file: "12-sangre-prestada.mp3", seconds: 2231 },
    { number: 13, title: "Una mano quieta", part: "Parte II", file: "13-lo-que-no-se-apaga.mp3", seconds: 2027 },
    { number: 14, title: "El nombre al final", part: "Parte II", file: "14-el-nombre-al-final.mp3", seconds: 1928 }
  ]
};
