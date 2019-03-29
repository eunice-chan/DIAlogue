var dial = [['*HELLO.'], ['*ISN\'T', ' IT A ', '*LOVELY', ' DAY?'],
['*AREN\'T', ' YOU ', '*GLAD', ' TO TALK TO ME?'],
['*DON\'T', ' YOU ', '*CARE', ' ABOUT ME?'],
['YOU CAN RE', '*LY', ' ON ME. YOU ARE ', '*NOTHING', ' WITHOUT ME.'],
['IF I ', '*LEAVE', ' YOU ARE ', '*WORTHLESS.'],
['YOU\'LL BE ', '*BEGGING', ' FOR ', '*ME', ' TO COME BACK.'],
['YOU\'LL BE ALL ', '*ALONE.'], ['YOU ', '*CAN\'T', ' DO', ' THIS.']];
var index = 0; //what point are we at in the conversation?
var dialogue = document.getElementById('dialogue'); //the conversation thus far
var line = document.createElement('section'); //current line
var chosen = []; //which options were chosen?
$(document).ready(dia()); //start
function dia() {
  var text = dial[index];
  if (text) {
    line = document.createElement('section');
    text.forEach(createLine);
    dialogue.appendChild(line);
    index += 1;
  }
  dialogue.scrollIntoView(false);
}

function createLine(text) {
  var sp = document.createElement('span');
  var cck = (text[0] == '*');
  if (cck) {
    text = text.substring(1); //remove *
  }
  sp.appendChild(document.createTextNode(text)); //add text to the line
  if (cck) {
    sp.setAttribute('class', 'cck');
    sp.setAttribute('id', text);
    if (sp.textContent.toLowerCase() == sp.textContent) {
      sp.addEventListener('click', function() {setTimeout(badEnd(), 1000);}, {once : true});
    }
    sp.addEventListener('click', function() {clkans(sp);}, {once : true});
  }
  line.appendChild(sp);
}

function clkans(sp) {
  var text = sp.textContent.replace(/\./g,' ').toLowerCase();
  //special cases
  if (sp.id == 'LY') {
    text = 'lie';
  }
  if (sp.id == 'CAN\'T') {
    var branch = chosen.indexOf('leave');
    if (branch > -1 && chosen[branch + 1] == 'me') {
      sp.innerHTML = 'CAN';
      var finalLine = line.children;
      for (var i = 0; i < finalLine.length; i++) {
        child = finalLine[i];
        child.addEventListener('click',
        function(e) {
          this.textContent = ' ';
          line.id += 'T';
          if (line.id == 'TTTT') {
            setTimeout(restart(), 1000000);
          }
        }, {once : true});
      }
      return;
    } else {
      dial = [['BUT ', 'DON\'T ', 'WORRY. ', 'I ', 'WON\'T ', '*LEAVE.'], ['YOU\'LL ', 'BE ', 'WITH ', '*ME', ' FOREVER.'], ['*can\'t leave me']];
      index = 0;
    }
  }
  line = document.createElement('section');
  chosen.push(text);
  createLine(text);
  dialogue.appendChild(line);
  dialogue.scrollIntoView(false);
  setTimeout(function() {dia(dialogue);}, 1000);
}

function badEnd() {
  $(dialogue).fadeOut(1000, function() {
    dialogue.innerHTML = 'can\'t leave me alone';
  });
  $(dialogue).fadeIn(1000);
  $(dialogue).fadeOut(1000, function() {
    dialogue.innerHTML = 'please leave me alone';
  });
  $(dialogue).fadeIn(1000);
  $(dialogue).fadeOut(1000, function() {
    dialogue.innerHTML = 'try again';
  });
  $(dialogue).fadeIn(1000);
  setTimeout(restart(), 100000);
}

function restart() {
  $(dialogue).fadeOut("slow", function() {
    window.location.href = './index.html';
  });
}

///////ooooof starter code that I wrote when I was still trying to figure out the structure of what I need to do.
//////Rlly gross. Don't look.

function start() {
  dialogue = document.getElementById("dialogue");
  var line = document.createElement("div");
  var sp = document.createElement("span");
  sp.appendChild(document.createTextNode(dial[index][0])); //HELLO.
  sp.setAttribute("class", "cck"); //can click
  line.appendChild(sp);
  dialogue.appendChild(line);
  index += 1;
  line.addEventListener("click", function() {ans(dialogue, line.textContent.toLowerCase());}, {once : true});
}
function ans(dialogue, text) {
  var next = document.createElement("P");
  next.appendChild(document.createTextNode(text));
  dialogue.appendChild(next);
  setTimeout(function() {day(dialogue);}, 1000);
}
function day(dialogue) {
    var isnt = document.createElement("P");
    isnt.appendChild(document.createTextNode("ISN'T"));
    isnt.setAttribute("class", "cck");
    var lovely = document.createElement("P");
    lovely.appendChild(document.createTextNode("LOVELY"));
    lovely.setAttribute("class", "cck");
    dialogue.appendChild(next);
}
