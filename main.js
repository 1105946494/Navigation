/*加载时间设置 */
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
  $(".shi").html(shi);
  $(".fen").html(fen);
}
/*input样式设置*/
$(".headerInput").click(function () {
  $(".headerInput").addClass("inputDown");
  $(".headerInput").attr("placeholder", "");
});
$(".headerInput").blur(function () {
  $(".headerInput").removeClass("inputDown");
  $(".headerInput").attr("placeholder", "Search");
});
/*时间样式设置*/
$(".time").mousemove(function () {
  $(".time").removeClass("timeMoveOut");
  $(".time").addClass("timeMove");
});
$(".time").mouseout(function () {
  $(".time").addClass("timeMoveOut");
});
/**********************************/
