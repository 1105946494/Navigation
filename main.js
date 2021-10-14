window.onload = function () {
  setTime();
  let time = setInterval(function () {
    setTime();
  }, 5000);
  window.onbeforeunload = function () {
    window.clearInterval(time);
  };
};
function setTime() {
  let time = new Date();
  let shi = time.getHours();
  let fen = time.getMinutes();
  if (fen < 10) {
    fen = "0" + fen.toString();
  }
  document.querySelector(".shi").innerHTML = shi;
  document.querySelector(".fen").innerHTML = fen;
}
let inputDown = document.querySelector(".headerInput");
inputDown.onclick = function () {
  inputDown.classList.add("inputDown");
  inputDown.setAttribute("placeholder", "");
};
inputDown.onblur = function () {
  inputDown.classList.remove("inputDown");
  inputDown.setAttribute("placeholder", "Search");
};
