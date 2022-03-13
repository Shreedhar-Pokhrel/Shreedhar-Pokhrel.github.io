const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 0.98 * window.innerWidth;
canvas.height = 0.7 * canvas.width;
canvas.style.width = `${canvas.width}px`;
canvas.style.height = `${canvas.height}px`;
var hgt = canvas.height;
var wdt = canvas.width;
var mwdt = wdt / 2;
var mhgt = hgt / 2;
var pt = 20;
var inptFins = [];

function collectElements() {
  const inptBtn = document.getElementById("inptBtn");
  inptBtn.style.width = "25px";
  inptBtn.style.backgroundColor = "#f1a26b";
  inptBtn.style.border = "none";
  inptBtn.style.color = "white";

  const logo = document.getElementById("logo");
  logo.style.width = "50px";
  logo.style.height = "25px";
  logo.style.float = "right";
  logo.style.margin = "-5px 2% 0 0";

  const graphbtn = document.getElementById("graphBtn");
  graphbtn.style.width = "50px";
  graphbtn.style.backgroundColor = "#f1a26b";
  graphbtn.style.border = "none";
  graphbtn.style.color = "white";
  const yfunc1 = document.getElementById("yfunc1");
  yfunc1.style.outline = "none";
  yfunc1.style.border = "1px solid #888";
  yfunc1.style.display = "inline-block";
  yfunc1.style.width = "98%";
  yfunc1.style.margin = "-5px -5px 5px 0 ";

  graphbtn.addEventListener("click", () => {
    inptFins = [];
    if (yfunc1.value != "") {
      inptFins.push(yfunc1.value.replace(/x/g, "xpu"));
    }
    let inpt = document.getElementsByClassName("yfunc");
    for (let i = 0; i < inpt.length; i++) {
      let inptVal = document.getElementsByClassName("yfunc")[i].value;
      if (inptVal != "") {
        let inptFin = inptVal.replace(/x/g, "xpu");
        inptFins.push(inptFin);
      }
    }
    reloadPage();
  });
}
collectElements();
var num = 2;
function addInpt() {
  const inptDiv = document.getElementById("inputs");
  let inptinst = document.createElement("Input");
  let ylab =
    "function of x (For Complex Function, Please use Javascript inbuilt functions!) eg. x*x, 2*x, Math.tan(x), etc.";
  inptinst.setAttribute("type", "text");
  inptinst.setAttribute("class", "yfunc");
  inptinst.setAttribute("placeholder", ylab);
  inptinst.setAttribute("id", `yfunc${num}`);
  inptinst.style.outline = "none";
  inptinst.style.border = "1px solid #888";
  inptinst.style.display = "inline-block";
  inptinst.style.margin = "-5px -5px 5px 0 ";
  inptinst.style.width = "96%";

  let rembtn = document.createElement("button");
  rembtn.textContent = "-";
  rembtn.setAttribute("id", `ybtn${num}`);
  rembtn.setAttribute(
    "onclick",
    `document.getElementById("yfunc${num}").remove();document.getElementById("ybtn${num}").remove();`
  );
  rembtn.style.width = "25px";
  rembtn.style.backgroundColor = "red";
  rembtn.style.border = "none";
  rembtn.style.color = "white";
  inptDiv.appendChild(rembtn);
  inptDiv.appendChild(inptinst);
  num++;
}
function createAxis() {
  ctx.beginPath();
  ctx.moveTo(mwdt, 0);
  ctx.lineTo(mwdt, hgt);
  ctx.stroke();
  ctx.moveTo(0, mhgt);
  ctx.lineTo(wdt, mhgt);
  ctx.stroke();
  var ticSize = 3 / 2;
  ctx.font = "bold 0.5rem serif";
  ctx.textAlign = "center";
  for (let i = 1; i < Math.floor(wdt / pt); i++) {
    ctx.moveTo(mwdt - i * pt, mhgt - ticSize);
    ctx.lineTo(mwdt - i * pt, mhgt + ticSize);
    ctx.fillText(-i, mwdt - i * pt, mhgt + 6 * ticSize);
    ctx.stroke();
    ctx.moveTo(mwdt + i * pt, mhgt - ticSize);
    ctx.lineTo(mwdt + i * pt, mhgt + ticSize);
    ctx.fillText(i, mwdt + i * pt, mhgt + 6 * ticSize);
    ctx.stroke();
  }
  ctx.textAlign = "end";
  ctx.textBaseline = "middle";
  for (let i = 1; i < Math.floor(hgt / pt); i++) {
    ctx.moveTo(mwdt - ticSize, mhgt - i * pt);
    ctx.lineTo(mwdt + ticSize, mhgt - i * pt);
    ctx.fillText(i, mwdt + 7 * ticSize, mhgt - i * pt);
    ctx.stroke();
    ctx.moveTo(mwdt - ticSize, mhgt + i * pt);
    ctx.lineTo(mwdt + ticSize, mhgt + i * pt);
    ctx.fillText(-i, mwdt + 8 * ticSize, mhgt + i * pt);
    ctx.stroke();
  }
  ctx.closePath();
}
function createGrid() {
  ctx.beginPath();
  ctx.strokeStyle = "#f1f1f1";
  for (let i = 1; i < Math.floor(wdt / pt); i++) {
    ctx.moveTo(mwdt - i * pt, 0);
    ctx.lineTo(mwdt - i * pt, hgt);
    ctx.stroke();
    ctx.moveTo(mwdt + i * pt, 0);
    ctx.lineTo(mwdt + i * pt, hgt);
    ctx.stroke();
  }
  for (let i = 1; i < Math.floor(hgt / pt); i++) {
    ctx.moveTo(0, mhgt - i * pt);
    ctx.lineTo(wdt, mhgt - i * pt);
    ctx.stroke();
    ctx.moveTo(0, mhgt + i * pt);
    ctx.lineTo(wdt, mhgt + i * pt);
    ctx.stroke();
  }
  ctx.strokeStyle = "#000";
  ctx.closePath();
}
function createGraph(listed) {
  for (let a = 0; a < listed.length; a++) {
    let colored =
      "rgb(" +
      Math.floor(Math.random() * 100) +
      "," +
      Math.floor(Math.random() * 100) +
      "," +
      Math.floor(Math.random() * 100) +
      ")";
    if (a == 0) document.getElementById("yfunc1").style.color = colored;
    else document.getElementsByClassName("yfunc")[a - 1].style.color = colored;
    ctx.strokeStyle = colored;

    let x = [];
    let y = [];
    let points = 80000;
    let range = [-mwdt / pt, mwdt / pt];
    let diff = (Math.abs(range[0]) + Math.abs(range[1])) / points;
    for (let i = 0; i < points + 1; i++) {
      let xpu = range[0] + i * diff;
      let ypu = -1 * eval(listed[a]);
      x.push(xpu * pt);
      y.push(ypu * pt);
    }
    ctx.beginPath();
    ctx.moveTo(x[0], y[0]);
    for (let i = 0; i < y.length; i++) {
      if (y[i] >= hgt || x[i] >= wdt || y[i] < -hgt || x[i] < -wdt) {
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(x[i], y[i]);
      } else {
        ctx.lineTo(x[i], y[i]);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(x[i], y[i]);
      }
    }
    ctx.closePath();
    ctx.stroke();
  }
}
function reloadPage() {
  ctx.clearRect(0, 0, canvas.height, canvas.width);
  canvas.width = 0.98 * window.innerWidth;
  canvas.height = 0.7 * canvas.width;
  canvas.style.width = `${canvas.width}px`;
  canvas.style.height = `${canvas.height}px`;
  hgt = canvas.height;
  wdt = canvas.width;
  mwdt = wdt / 2;
  mhgt = hgt / 2;
  createGrid();
  createAxis();
  ctx.translate(mwdt, mhgt);
  createGraph(inptFins);
}
window.addEventListener("resize", () => {
  canvas.width = 0.98 * window.innerWidth;
  canvas.height = 0.7 * canvas.width;
  canvas.style.width = `${canvas.width}px`;
  canvas.style.height = `${canvas.height}px`;
  if (inptFins.length != 0) reloadPage();
});
