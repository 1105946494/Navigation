/*加载时间设置 */
let time;
window.onload = function () {
  setTime();
  time = setInterval(function () {
    setTime();
  }, 5000);
};
window.onbeforeunload = function () {
  window.clearInterval(time);
  let string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
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
/*添加网址并且添加缓存 */
const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  { logo: "B", url: "https://www.acfun.cn" },
];
const simplifyUrl = (url) => {
  return url.replace("https://", "").replace("http://", "").replace("www.", "");
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node) => {
    const $li = $(`<li>
    <a href="${node.url}"
      ><div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
      </div></a
    >
  </li>`).insertBefore($lastLi);
  });
};
render();
$(".addButton").click(function () {
  let url = window.prompt("请问你要添加的网址是啥？");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  });
  render();
  // const $li = $(`<li>
  // <a href="${url}">
  // <div class="site">
  //   <div class="logo">${url[0]}</div>
  //   <div class="link">${url}</div>
  // </div>
  // </a>
  // </li>`).insertBefore($lastLi);
});
