let oApp;

document.addEventListener("DOMContentLoaded", () => {
  oApp = new app();
  oApp.init('GET', 'https://raw.githubusercontent.com/enextgroup/quero-trabalhar-na-enext/master/assets/potions.json');
});

window.addEventListener("resize", () => {
  oApp.resize()
});