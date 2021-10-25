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
/*添加网址并且添加缓存和删除网址 */
const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  { logo: "B", url: "https://www.acfun.cn" },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //删除 / 开头内容
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`
  <li>
    <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-chacha"></use>
          </svg>
        </div>
      </div>
  </li>
  `).insertBefore($lastLi);
    $li.click(() => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
    //鼠标滑过样式设置
    $li.mousemove(function () {
      $li.removeClass("lastStyleOut");
      $li.addClass("lastStyle");
    });
    $li.mouseout(function () {
      $li.addClass("lastStyleOut");
    });
    $li.mousemove(function () {
      $li.find(".site").removeClass("moveSiteOut");
      $li.find(".site").addClass("moveSite");
    });
    $li.mouseout(function () {
      $li.find(".site").removeClass("moveSite");
      $li.find(".site").addClass("moveSiteOut");
    });
    //鼠标滑过样式设置结束
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
});
/*监听键盘事件 */
$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
/*网址样式设置 */
$(".last").mousemove(function () {
  $(".last").removeClass("lastStyleOut");
  $(".last").addClass("lastStyle");
});
$(".last").mouseout(function () {
  $(".last").addClass("lastStyleOut");
});

$(".last").mousemove(function () {
  $(".addButton").removeClass("moveButtonOut");
  $(".addButton").addClass("moveButton");
});
$(".last").mouseout(function () {
  $(".addButton").addClass("moveButtonOut");
});
