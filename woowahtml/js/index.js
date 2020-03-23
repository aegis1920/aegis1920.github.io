import { html4tableData, xhtmltableData } from "./data.js";
import { addClass, removeClass } from "./util.js";

function loadhtml4Data() {
  var html = document.querySelector("#html4tableTemplate").innerHTML;
  var html4tables = html4tableData;

  var tempHtml = "";

  for (var i = 0; i < html4tables.length; i++) {
    tempHtml += html
      .replace("{division}", html4tables[i].division)
      .replace("{html4}", html4tables[i].html4)
      .replace("{html5}", html4tables[i].html5);
  }

  document.querySelector("#html4Table").innerHTML = tempHtml;
}

function loadxhtmlData() {
  var html = document.querySelector("#xhtmltableTemplate").innerHTML;
  var xhtmltables = xhtmltableData;

  var tempHtml = "";

  for (var i = 0; i < xhtmltables.length; i++) {
    tempHtml += html
      .replace("{division}", xhtmltables[i].division)
      .replace("{xhtml}", xhtmltables[i].xhtml)
      .replace("{html5}", xhtmltables[i].html5);
  }

  document.querySelector("#xhtmlTable").innerHTML = tempHtml;
}

function loopAddClass(value, classString) {
  for (var i = 0; i < value.length; i++) {
    addClass(value[i], classString);
  }
}

function loopRemoveClass(value, classString) {
  for (var i = 0; i < value.length; i++) {
    removeClass(value[i], classString);
  }
}

function applyBodyBlur() {
  var containerValue = document.querySelectorAll(".container");
  loopAddClass(containerValue, "blur");
}

function removeBlur() {
  var containerValue = document.querySelectorAll(".container");
  loopRemoveClass(containerValue, "blur");
}

function overlayOn() {
  document.getElementById("overlay").style.display = "block";
}

function overlayOff() {
  document.getElementById("overlay").style.display = "none";
}

document.querySelector(".check-input").addEventListener("click", checkInput);

function checkInput() {
  if (document.getElementById("inputValue").value == "y") {
    alert("정답입니다 :) 통과!");
    overlayOff();
    removeBlur();
  } else {
    alert("틀렸습니다. 다시 한 번 해보세요");
  }
}

function applyCss() {
  var tableValue = document.querySelectorAll(".applyTable");
  loopAddClass(tableValue, "type");
  var bodyValue = document.getElementsByTagName("body");
  loopAddClass(bodyValue, "bodyFont");
  var codeValue = document.querySelectorAll(".codeType");
  loopAddClass(codeValue, "code");
}

function applyJs() {
  overlayOn();
  applyBodyBlur();
}

window.onload = () => {
  loadhtml4Data();
  loadxhtmlData();
};

document
  .querySelector("#cssApplyButton")
  .addEventListener("click", () => applyCss());

document
  .querySelector("#jsApplyButton")
  .addEventListener("click", () => applyJs());
