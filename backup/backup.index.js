let eventData;
let allMembers;
let ratingData;
let testing = false;
let newMember = {
  name: "",
  hq_level: 0
};

$(document).ready(() => {
  $("#members").fadeOut(1);
  $(".newMember").slideUp(1);

  getData();
});

// --------------------------------------------- API FUNCTIONS ---------------------------------------------
/*
TBD:
1. Replace alerts with toasts


if (testing) {console.log("")}
*/

$("#btn-startEvent").on("click", function() {
  console.log(allMembers["grohl"]);
});

// --------------------------------------------- API FUNCTIONS ---------------------------------------------

const getData = async () => {
  if (testing) {
    allMembers = mockMembers;
    buildAllMembers();
  } else {
    console.log("getData: Getting members");
    getAllMembers()
      .then(() => {
        buildAllMembers("rating_m");
      })
      .catch(error => {
        console.log("getData: Could not get all members");
      });
    getEventData();
  }
};
const apiMembers = "https://rte-node.herokuapp.com/members";
const apiEvent = "https://rte-node.herokuapp.com/event";

const getAllMembers = () => {
  return fetch(apiMembers)
    .then(response => {
      return response.json();
    })
    .then(data => {
      allMembers = data;
      return allMembers;
      //console.log(allMembers);
    });
};

const getEventData = () => {
  return fetch(apiEvent)
    .then(response => {
      return response.json();
    })
    .then(data => {
      eventData = data;
      //console.log(eventData);
    });
};

const patchUpdate = info => {
  const apiMembersId = apiMembers + "/" + info._id;
  const prms = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(info)
  };
  return fetch(apiMembersId, prms)
    .then(response => {
      return response.json();
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

const postNewMember = info => {
  const prms = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(info)
  };
  return fetch(apiMembers, prms)
    .then(response => {
      return response.json();
    })
    .then(res => {
      console.log("POST result");
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

const deleteMember = (id, api) => {
  const reqApi = api + "/" + id;
  const prms = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  };
  return fetch(reqApi, prms)
    .then(response => {
      return response.json();
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

// --------------------------------------------- SERVICE FUNCTIONS ---------------------------------------------

// CONVERT INT TO DOUBLE-DIGIT STRING (5 => "05")
const getNumString = n => {
  let num;
  if (n < 10) {
    num = "0" + n;
  } else {
    num = n.toString(10);
  }
  return num;
};

const getIdStr = id => {
  let str = id[id.length - 2] + id[id.length - 1];
  return str;
};

const levelConvert = lvl => {
  const rom = ["ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "%"];
  let vis = rom[lvl - 2];
  return vis;
};

const search = (name, inputArray) => {
  console.log("search: start");
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i].name === name) {
      console.log("fonud");
      return inputArray[i];
    }
  }
  console.log("not found");
  return undefined;
};

function selectionSort(arr, param) {
  let minIdx,
    temp,
    len = arr.length;
  for (let i = 0; i < len; i++) {
    minIdx = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j][param] < arr[minIdx][param]) {
        minIdx = j;
      }
    }
    temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
  }
  //console.log(arr);
  return arr;
}

// --------------------------------------------- ADD NEW MEMBER ---------------------------------------------

$(document).on("click", "#btn-addMember", function() {
  if (allMembers.length < 30) {
    $(".newMember").slideDown(500);
  } else {
    console.log("Squad is full!");
    alert("There are no free slots for new members.");
  }
});

$(document).on("click", ".hqLvl", function() {
  console.log("selecting level");
  let visual = document.getElementById(this.id).textContent;
  let id = this.id[this.id.length - 1];
  console.log(id);
  let lvl = 0;
  if (id === "e") {
    lvl = 11;
  } else if (id === "0") {
    lvl = 10;
  } else {
    lvl = parseInt(id, 10);
  }
  newMember.hq_level = lvl;
  console.log(visual);
  document.getElementById("hqSelection").textContent = visual;
  console.log(newMember);
});

$(document).on("click", "#submitMember", function() {
  if (allMembers.length < 30) {
    let newName = document.forms["newMemberForm"]["newName"].value;
    console.log("New name: " + newName);
    if (newName.length < 3) {
      console.log("New name too short!");
      alert("New name is too short! At least 3 characters are required");
    } else if (search(newName, allMembers)) {
      console.log("member exists");
      console.log(search(newName, allMembers));
      alert("Member with this name already exists");
    } else if (newMember.hq_level < 2) {
      console.log("HQ level not selected!");
      alert("Please select the HQ level for the new member");
    } else {
      newMember["name"] = newName;
      console.log(newMember);

      appendNewMember(newMember);

      document.getElementById("hqSelection").textContent = "hq level";
      document.forms["newMemberForm"]["newName"].value = "";
      $(".newMember").slideUp(500);
      newMember.name = "";
      newMember.hq_level = 0;
    }
  } else {
    console.log("Squad is full!");
    alert("There are no free slots for new members.");
  }
});

const appendNewMember = async newMember => {
  if (testing) {
    mockMembers.push(newMember);
    allMembers = mockMembers;
    console.log(allMembers);
    let m = allMembers.length - 1;
    buildMember(allMembers[m], m);
  } else {
    postNewMember(newMember)
      .then(() => {
        return getAllMembers();
      })
      .then(() => {
        let m = allMembers.length - 1;
        console.log(allMembers);
        console.log(m);
        buildMember(allMembers[m], m);
      });
  }
};

// --------------------------------------------- CREATE BODY ---------------------------------------------

const buildAllMembers = sort => {
  selectionSort(allMembers, sort);

  const last = allMembers.length - 1;
  for (let m = last; m >= 0; m--) {
    buildMember(allMembers[m], m);
  }
};

const buildMember = (amd, m) => {
  const container = document.getElementById("members");

  let numStr = getNumString(m);
  if (testing) {
    console.log("BUILDMEMBER: building member " + numStr);
  }
  const row = document.createElement("div");
  row.setAttribute("class", "row member");
  row.setAttribute("id", "mRow" + numStr);
  container.appendChild(row);
  if (testing) {
    console.log("row added");
  }
  const ofc = document.createElement("div");
  ofc.setAttribute("class", "col-sm-2 ofc hq");
  ofc.setAttribute("id", "ofc" + numStr);
  row.appendChild(ofc);

  const hq = document.createElement("h2");
  hq.setAttribute("id", "hq" + numStr);
  hq.textContent = levelConvert(amd.hq_level);
  ofc.appendChild(hq);
  if (amd.hq_level === 11) {
    $("#hq" + numStr).css("font-size", "3rem");
  }

  const officer = document.createElement("h1");
  if (amd.is_officer) {
    officer.textContent = "#";
  }
  ofc.appendChild(officer);
  if (testing) {
    console.log("officer added");
  }
  const rowTable = document.createElement("table");
  rowTable.setAttribute("class", "col-sm-10");
  row.appendChild(rowTable);
  if (testing) {
    console.log("row table added");
  }
  const tr1 = document.createElement("tr");
  rowTable.appendChild(tr1);
  const tr2 = document.createElement("tr");
  rowTable.appendChild(tr2);
  if (testing) {
    console.log("table rows added");
  }

  const nombre = document.createElement("th");
  nombre.setAttribute("class", "nameM");
  nombre.textContent = amd.name;
  tr1.appendChild(nombre);
  if (testing) {
    console.log("nombre added");
  }

  const icon1t = document.createElement("th");
  tr1.appendChild(icon1t);
  const icon1 = document.createElement("i");
  icon1.setAttribute("class", "swg swg-stormtrooper-3 swg-4x");
  icon1t.appendChild(icon1);

  const icon2t = document.createElement("th");
  tr1.appendChild(icon2t);
  const icon2 = document.createElement("i");
  icon2.setAttribute("class", "swg swg-lightsabers swg-4x");
  if (amd.is_active) {
    icon2.setAttribute("style", "color:yellow");
  }
  icon2t.appendChild(icon2);

  const icon3t = document.createElement("th");
  tr1.appendChild(icon3t);
  const icon3 = document.createElement("i");
  icon3.setAttribute("class", "swg swg-credits swg-4x");
  icon3t.appendChild(icon3);
  if (testing) {
    console.log("icons added");
  }

  const place = document.createElement("td");
  tr2.appendChild(place);

  const donations = document.createElement("td");
  donations.setAttribute("id", "donated" + numStr);
  donations.textContent = amd.donated_new;
  tr2.appendChild(donations);

  const events = document.createElement("td");
  events.setAttribute("id", "events" + numStr);
  events.textContent = amd.events;
  tr2.appendChild(events);

  const rating = document.createElement("td");
  rating.setAttribute("id", "rating" + numStr);
  rating.textContent = amd.rating_m;
  tr2.appendChild(rating);

  $("#members").fadeIn(1000);
};

// --------------------------------------------- TOGGLE ADDITIONAL INFO PANEL ---------------------------------------------
$(document).on("click", ".member", function() {
  let idStr = getIdStr(this.id);
  let idInt = parseInt(idStr, 10);
  if (document.getElementById("moreStats" + idStr)) {
    console.log("already exists");
    $("#moreStats" + idStr).slideToggle();
  } else {
    buildExtras(this.id, idStr, idInt);
  }
  updateExtras(allMembers[idInt], idStr);
});

const updateExtras = (currentMember, idStr) => {
  $("#donations" + idStr + " .old").text(
    "last week: " + currentMember.donated_old
  );
  $("#donations" + idStr + " .new").text(
    "this week: " + currentMember.donated_new
  );
  $("#ratings" + idStr + " .monthly").text("monthly " + currentMember.rating_m);
  $("#ratings" + idStr + " .allTime").text(
    "all-time " + currentMember.rating_a
  );

  let donationPlus = currentMember.donated_new - currentMember.donated_old;
  if (donationPlus > 0) {
    $("#dBadge" + idStr).text("+" + donationPlus);
    $("#dBadge" + idStr).css("background-color", "#fdd835");
  }

  let rBadgeN = 0;
  if (donationPlus > 0) {
    rBadgeN = donationPlus / 50;
    rBadgeN = Math.round(rBadgeN * 10) / 10;
    rBadgeN++;
  }
  let evStat = search(currentMember.name, eventData);

  if (evStat) {
    rBadgeN += evStat.score;
  }
  if (rBadgeN > 0) {
    $("#rBadge" + idStr).text("+" + rBadgeN);
    $("#rBadge" + idStr).css("background-color", "#fdd835");
  }
  if (donationPlus > 50) {
    $("#dBadge" + idStr).css("background-color", "#43a047");
    $("#rBadge" + idStr).css("background-color", "#43a047");
  }
};

const buildExtras = (elmid, idStr) => {
  const moreStats = document.createElement("div");
  moreStats.setAttribute("class", "container moreStats");
  moreStats.setAttribute("id", "moreStats" + idStr);

  const btnEdit = document.createElement("button");
  btnEdit.setAttribute("class", "btn btn-warning btnEdit");
  btnEdit.setAttribute("id", "btnEdit" + idStr);
  btnEdit.textContent = "edit";
  moreStats.appendChild(btnEdit);

  const btnDel = document.createElement("button");
  btnDel.setAttribute("class", "btn btn-danger btnDel");
  btnDel.setAttribute("id", "btnDel" + idStr);
  btnDel.textContent = "delete";
  moreStats.appendChild(btnDel);

  const donations = document.createElement("div");
  donations.setAttribute("class", "col-sm-4 extraStat donations");
  donations.setAttribute("id", "donations" + idStr);
  moreStats.appendChild(donations);

  const ratings = document.createElement("div");
  ratings.setAttribute("class", "col-sm-4 extraStat ratings");
  ratings.setAttribute("id", "ratings" + idStr);
  moreStats.appendChild(ratings);

  const donationsL = document.createElement("p");
  donationsL.setAttribute("class", "statName");
  donationsL.textContent = "donated";
  donations.appendChild(donationsL);

  const dBadge = document.createElement("span");
  dBadge.setAttribute("class", "label");
  dBadge.setAttribute("id", "dBadge" + idStr);
  donationsL.appendChild(dBadge);

  const ratingsL = document.createElement("p");
  ratingsL.setAttribute("class", "statName");
  ratingsL.textContent = "rating";
  ratings.appendChild(ratingsL);

  const rBadge = document.createElement("span");
  rBadge.setAttribute("class", "label");
  rBadge.setAttribute("id", "rBadge" + idStr);
  ratingsL.appendChild(rBadge);

  const classes = ["old", "new", "monthly", "allTime"];
  for (let c = 0; c < classes.length; c++) {
    let pr = document.createElement("p");
    pr.setAttribute("class", classes[c]);
    pr.textContent = 0;
    if (c < 2) {
      donations.appendChild(pr);
    } else {
      ratings.appendChild(pr);
    }
  }

  let elem = document.getElementById(elmid);
  elem.parentNode.insertBefore(moreStats, elem.nextSibling);

  $("#moreStats" + idStr).slideUp(1);
  $("#moreStats" + idStr).slideDown(500);
};

// --------------------------------------------- INFO PANEL BUTTONS ---------------------------------------------

$(document).on("click", ".btnDel", function() {
  let idStr = getIdStr(this.id);
  let idInt = parseInt(idStr, 10);
  if (allMembers[idInt].name === "grohl") {
    alert("Squad leader cannot be removed");
  } else {
    //
    currentMember = allMembers[idInt];
    let idMembers = allMembers[idInt]._id;
    let idEvent = search(allMembers[idInt].name, eventData);
    if (idEvent) {
    }
    deleteMember(idMembers, apiMembers).then(() => {
      if (idEvent) {
        idEvent = idEvent._id;
        deleteMember(idEvent, apiEvent);
      } else {
        console.log("Not in events");
      }
    });

    $("#mRow" + idStr).slideUp(500);
    $("#moreStats" + idStr).slideUp(300);
    setTimeout(function() {
      $("#mRow" + idStr).remove();
      $("#moreStats" + idStr).remove();
    }, 500);
  }
});

$(document).on("click", ".confirmDel", function() {});

// --------------------------------------------- MOCK DATA ---------------------------------------------

const mockMembers = [
  {
    is_officer: true,
    events: 0,
    donated_old: 0,
    donated_new: 0,
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
    donated_old: 0,
    donated_new: 0,
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
    donated_old: 0,
    donated_new: 0,
    is_active: true,
    rating: 5.3,
    _id: "5d9a3b0db3727c0055efc350",
    name: "Bellamy",
    hq_level: 6,
    __v: 0
  },
  {
    is_officer: true,
    events: 0,
    donated_old: 0,
    donated_new: 0,
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
    donated_old: 0,
    donated_new: 0,
    is_active: false,
    rating: 22.6,
    _id: "5d9a3b3bb3727c0055efc352",
    name: "Chushentsia",
    hq_level: 11,
    __v: 0
  }
];
