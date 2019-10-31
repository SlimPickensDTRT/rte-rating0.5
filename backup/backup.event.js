let eventData;
let allMembers;
let currentMember;

$(".swg-starwars").on("click", function() {
  let tst = parseInt(eventData.length, 16);
  console.log(tst);
});

const hc = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E"
];

const mockEvent = [
  {
    action1: 3,
    action2: 3,
    action3: 3,
    facilities: 0,
    prepared: true,
    _id: "5d9a2d2892965e005517c89a",
    name: "Grohl 0",
    __v: 0
  },
  {
    action1: -1,
    action2: -1,
    action3: -1,
    facilities: 3,
    prepared: false,
    _id: "5d9a2d4492965e005517c89b",
    name: "Agutin 1",
    __v: 0
  },
  {
    action1: 3,
    action2: -1,
    action3: -1,
    facilities: 1,
    prepared: false,
    _id: "5d9a2d4e92965e005517c89c",
    name: "Bon Jovi 2",
    __v: 0
  },
  {
    action1: -1,
    action2: -1,
    action3: -1,
    facilities: 3,
    prepared: false,
    _id: "5d9a2d4492965e005517c89b",
    name: "Agutin 3",
    __v: 0
  },
  {
    action1: 3,
    action2: -1,
    action3: -1,
    facilities: 1,
    prepared: false,
    _id: "5d9a2d4e92965e005517c89c",
    name: "Bon Jovi 4",
    __v: 0
  },
  {
    action1: -1,
    action2: -1,
    action3: -1,
    facilities: 3,
    prepared: false,
    _id: "5d9a2d4492965e005517c89b",
    name: "Agutin 5",
    __v: 0
  },
  {
    action1: 3,
    action2: -1,
    action3: -1,
    facilities: 1,
    prepared: false,
    _id: "5d9a2d4e92965e005517c89c",
    name: "Bon Jovi 6",
    __v: 0
  },
  {
    action1: -1,
    action2: -1,
    action3: -1,
    facilities: 3,
    prepared: false,
    _id: "5d9a2d4492965e005517c89b",
    name: "Agutin 7",
    __v: 0
  },
  {
    action1: 3,
    action2: -1,
    action3: -1,
    facilities: 1,
    prepared: false,
    _id: "5d9a2d4e92965e005517c89c",
    name: "Bon Jovi 8",
    __v: 0
  },
  {
    action1: -1,
    action2: -1,
    action3: -1,
    facilities: 3,
    prepared: false,
    _id: "5d9a2d4492965e005517c89b",
    name: "Agutin 9",
    __v: 0
  },
  {
    action1: 3,
    action2: -1,
    action3: -1,
    facilities: 1,
    prepared: false,
    _id: "5d9a2d4e92965e005517c89c",
    name: "Bon Jovi 10",
    __v: 0
  },
  {
    action1: -1,
    action2: -1,
    action3: -1,
    facilities: 3,
    prepared: false,
    _id: "5d9a2d4492965e005517c89b",
    name: "Agutin 11",
    __v: 0
  },
  {
    action1: 3,
    action2: -1,
    action3: -1,
    facilities: 1,
    prepared: false,
    _id: "5d9a2d4e92965e005517c89c",
    name: "Bon Jovi 12",
    __v: 0
  },
  {
    action1: 3,
    action2: -1,
    action3: -1,
    facilities: 1,
    prepared: false,
    _id: "5d9a2d4e92965e005517c89c",
    name: "Bon Jovi 13",
    __v: 0
  },
  {
    action1: -1,
    action2: -1,
    action3: -1,
    facilities: 0,
    prepared: true,
    _id: "5d9a2d5a92965e005517c89d",
    name: "Bellamy 14",
    __v: 0
  }
];
const mockMembers = [
  {
    is_officer: true,
    events: 0,
    donated: 0,
    is_active: false,
    rating: 45.7,
    _id: "5d9a3a9eb3727c0055efc34e",
    name: "Grohl",
    hq_level: 8,
    __v: 0
  },
  {
    is_officer: false,
    events: 0,
    donated: 0,
    is_active: false,
    rating: 35.3,
    _id: "5d9a3ad6b3727c0055efc34f",
    name: "Agutin",
    hq_level: 7,
    __v: 0
  },
  {
    is_officer: false,
    events: 0,
    donated: 0,
    is_active: false,
    rating: 5.3,
    _id: "5d9a3b0db3727c0055efc350",
    name: "Bellamy",
    hq_level: 6,
    __v: 0
  },
  {
    is_officer: false,
    events: 0,
    donated: 0,
    is_active: false,
    rating: 12.6,
    _id: "5d9a3b26b3727c0055efc351",
    name: "Bon Jovi",
    hq_level: 5,
    __v: 0
  },
  {
    is_officer: false,
    events: 0,
    donated: 0,
    is_active: false,
    rating: 22.6,
    _id: "5d9a3b3bb3727c0055efc352",
    name: "Chushentsia",
    hq_level: 6,
    __v: 0
  }
];

$("#test").on("click", function() {
  console.log(eventData["Grohl"].name);
});

// ------------------------------------ API FUNCTIONS ------------------------------------
//ON LOAD GET ALL MEMBERS
$(document).ready(function() {
  $("#table").fadeOut(1);
  $("body").fadeIn(1000);
  console.log("INIT: Getting members");
  getData();
});

const getData = async () => {
  getAllMembers();
  getEventData();
  setTimeout(() => {
    //console.log(allMembers);
    //console.log(eventData);
    buildBody(eventData, allMembers);
  }, 1000);
};

const getAllMembers = () => {
  /* DISABLED WHILE IN DEVELOPMENT
  const apiMembers = "https://8lng6.sse.codesandbox.io/members";
  fetch(apiMembers)
    .then(response => {
      return response.json();
    })
    .then(data => {
      allMembers = data;
      console.log(allMembers);
    });*/
  allMembers = mockMembers;
};
const getEventData = () => {
  /* DISABLED WHILE IN DEVELOPMENT
  const apiEvent = "https://8lng6.sse.codesandbox.io/event";
  fetch(apiEvent)
    .then(response => {
      return response.json();
    })
    .then(data => {
      eventData = data;
      console.log(eventData);
    });*/
  eventData = mockEvent;
};
// ------------------------------------ SERVICE FUNCTIONS ------------------------------------
// FIND MEMBER OBJECT BY NAME
const search = (name, inputArray) => {
  console.log("search: start");
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i].name === name) {
      console.log("fonud");
      return inputArray[i];
    }
  }
  console.log("not found");
};
// Set member name to global var
// Return HTML id #
const getMemberName = elmid => {
  let ind = elmid[elmid.length - 1];
  let plid = hc.indexOf(ind);
  currentMember = eventData[plid];
  console.log("currentMember: plid:" + plid + " - " + currentMember.name);
  return plid;
};

const getActionCount = memberObj => {
  let count = 0;
  for (let i = 1; i <= 3; i++) {
    if (memberObj["action" + i] !== -1) {
      count++;
    }
  }
  count += memberObj.facilities;
  return count;
};

const calculateScore = memberObj => {
  let score = 0;
  for (let i = 1; i <= 3; i++) {
    if (memberObj["action" + i] === 0) {
      score++;
    } else if (memberObj["action" + i] > 0) {
      let q = memberObj["action" + i] * 0.5;
      score += 1 + q;
    }
  }
  score += memberObj.facilities * 2;
  score += memberObj.prepared;
  return score;
};
// ------------------------------------ AUTO HTML MANIPULATION ------------------------------------
const buildBody = (evd, amd) => {
  const container = document.getElementById("table");
  // Begin accessing JSON data here
  for (let m = 0; m < evd.length; m++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row member");

    const ofc = document.createElement("div");
    ofc.setAttribute("class", "col-sm-1 ofc");
    ofc.setAttribute("id", "ofc" + hc[m]);

    const name = document.createElement("div");
    name.setAttribute("class", "col-sm-4 mName");
    name.setAttribute("id", "mName" + hc[m]);
    /* DISABLED WHILE NAMES ARE MOCKED
    let memberStats = search(evd[m].name, amd);
    if (memberStats.is_officer) {
      ofc.textContent = " # ";
    }*/
    name.textContent = evd[m].name;

    const prep = document.createElement("i");
    prep.setAttribute("class", "col-sm-2 swg swg-atat-2 swg-4x prep");
    prep.setAttribute("id", "prep" + hc[m]);
    if (evd[m].prepared === true) {
      prep.setAttribute("style", "color:yellow");
    }

    const action = document.createElement("i");
    action.setAttribute("class", "col-sm-2 act fa fa-satellite-dish");
    action.setAttribute("id", "act" + hc[m]);
    let actions = evd[m].facilities;
    for (let a = 1; a <= 3; a++) {
      actions += evd[m]["action" + a];
    }
    if (actions >= 0) {
      action.setAttribute("style", "color:yellow");
    }

    const stats = document.createElement("div");
    stats.setAttribute("class", "col-sm-3 stats");
    stats.setAttribute("id", "stats" + hc[m]);

    const statAction = document.createElement("p");
    statAction.setAttribute("class", "statAction");
    statAction.textContent = "actions: " + getActionCount(evd[m]);

    const statScore = document.createElement("p");
    statScore.setAttribute("class", "statScore");
    statScore.textContent = "score: " + calculateScore(evd[m]);

    container.appendChild(row);
    row.appendChild(ofc);
    row.appendChild(name);
    row.appendChild(prep);
    row.appendChild(action);
    row.appendChild(stats);
    stats.appendChild(statAction);
    stats.appendChild(statScore);
  }
  console.log("Body build complete");
  $("#table").fadeIn(1000);
};

// DISABLE ACTIONS OVER ACTION LIMIT
const checkLimit = () => {
  for (let i = 1; i <= 3; i++) {
    if (currentMember["action" + i] !== -1) {
      let fac = document.getElementById("facility" + Math.abs(i - 4));
      shadowPaint(fac.id);
    }
    if (currentMember.facilities >= i) {
      let row = Math.abs(i - 4);
      for (let u = 0; u <= 3; u++) {
        let act = row + "action" + u;
        shadowPaint(act);
      }
    }
  }
};

const updateScore = () => {
  let actions = getActionCount(currentMember);
  let score = calculateScore(currentMember);
  let i = hc[eventData.indexOf(currentMember)];
  $("#stats" + i + " .statAction").text("actions: " + actions);
  $("#stats" + i + " .statScore").text("score: " + score);
};

// ------------------------------------ USER ACTIONS ------------------------------------

// TOGGLE PREPARED
$(document).on("click", ".prep", function() {
  let elmid = this.id;
  getMemberName(elmid);
  if (currentMember.prepared) {
    document.getElementById(elmid).style.color = "#dddddd";
    currentMember.prepared = false;
  } else {
    document.getElementById(elmid).style.color = "yellow";
    currentMember.prepared = true;
  }
  //postUpdate("event", "prepared", currentMember);
  console.log(
    "TOGGLE PREPARE: " +
      currentMember.name +
      " prepared: " +
      currentMember.prepared
  );
  updateScore();
});

// PREPARE ACTIONS MODAL AND OPEN
$(document).on("click", ".act", function() {
  let elmid = this.id;
  getMemberName(elmid);
  // Highlight active actions
  for (let row = 1; row <= 3; row++) {
    for (let up = 0; up <= currentMember["action" + row]; up++) {
      let lnk = row + "action" + up;
      document.getElementById(lnk).style.color = "yellow";
    }
  }
  let f = 1;
  while (f <= currentMember.facilities) {
    let fac = "facility" + f;
    document.getElementById(fac).style.color = "yellow";
    /*let dis = 4 - f;
    for (let n = 0; n <= 3; n++) {
      shadowPaint(dis + "action" + n);
    }*/
    f++;
  }
  checkLimit();
  $("#warStatsModal").modal();
});

// CLEAR ACTIVE ACTIONS ON CLOSE
$(".res").on("click", function() {
  $(".checked").removeAttr("style");
  $(".action").removeAttr("style");
  $(".facility").removeAttr("style");
  updateScore();
  let actions = getActionCount(currentMember);
  let i = hc[eventData.indexOf(currentMember)];
  if (actions > 0) {
    document.getElementById("act" + i).style.color = "yellow";
  } else {
    document.getElementById("act" + i).style.color = "#dddddd";
  }
});

// UPLINK CONTROLS
$(".action").on("click", function() {
  let urow = parseInt(this.id[0], 10);
  let unum = this.id[this.id.length - 1];
  if (currentMember.facilities + urow > 3) {
    console.log("Action limitation (action)");
  } else {
    saveUplinks(urow, unum);
    for (let n = 0; n <= unum; n++) {
      let lnk = urow + "action" + n;
      $("#" + lnk).removeAttr("style");
      document.getElementById(lnk).style.color = "yellow";
    }
    for (let n = 3; n > unum; n--) {
      let lnk = urow + "action" + n;
      $("#" + lnk).removeAttr("style");
      document.getElementById(lnk).style.color = "#dddddd";
    }
  }
  checkLimit();
});

// ZERO-STAR ACTIONS AND CANCELLING
$(".checked").on("click", function() {
  let urow = parseInt(this.id[0], 10);
  if (currentMember.facilities + urow > 3) {
    console.log("Action limitation (action)");
  } else if (currentMember["action" + urow] !== 0) {
    for (let n = 3; n > 0; n--) {
      let lnk = urow + "action" + n;
      $("#" + lnk).removeAttr("style");
    }
    document.getElementById(urow + "action0").style.color = "yellow";
    saveUplinks(urow, 0);
  } else {
    $("#" + this.id).removeAttr("style");
    saveUplinks(urow, -1);
  }
  checkLimit();
});

// ADD SHADOW FOR MISSED ACTIONS
const shadowPaint = lnk => {
  $("#" + lnk).removeAttr("style");
  $("#" + lnk).css("color", "#333333");
  $("#" + lnk).css(
    "text-shadow",
    "-1px 0 #dddddd, 0 1px #dddddd, 1px 0 #dddddd, 0 -1px #dddddd"
  );
};

// FACILITY CONTROLS
$(".facility").on("click", function() {
  let n = parseInt(this.id[this.id.length - 1], 10);
  let available = 0;
  for (let a = 1; a <= 3; a++) {
    if (currentMember["action" + a] === -1) {
      available++;
    }
  }
  console.log("available " + available);
  if (n <= available) {
    for (let i = 1; i <= n; i++) {
      document.getElementById("facility" + i).style.color = "yellow";
    }
    for (let x = n + 1; x <= available; x++) {
      document.getElementById("facility" + x).style.color = "#dddddd";
    }
    currentMember.facilities = n;
    console.log(currentMember);
  } else {
    console.log("Action limitation (facility)");
  }
  checkLimit();
});
$(document).on("click", ".fa-ban", function() {
  for (let i = 3; i >= 1; i--) {
    document.getElementById("facility" + i).style.color = "#dddddd";
    currentMember.facilities = 0;
  }
  checkLimit();
});

const limitReset = () => {
  for (let i = 1; i <= 3; i++) {
    if (currentMember["action" + i] === -1) {
      let fac = document.getElementById("facility" + Math.abs(i - 4));
      if (Math.abs(i - 4) > currentMember.facilities) {
        $("#" + fac.id).removeAttr("style");
      }
    }
    if (currentMember.facilities < i) {
      let row = Math.abs(i - 4);
      for (let u = 0; u <= 3; u++) {
        let act = row + "action" + u;
        $("#" + act.id).removeAttr("style");
      }
    }
  }
};

// SAVE ACTION TO EVENTDATA
const saveUplinks = (row, num) => {
  currentMember["action" + row] = parseInt(num, 10);
  let index = eventData.indexOf(currentMember);
  console.log(eventData[index]);
};
