'use strict'

let keywords = [];
let allObject = [];
let keywords2 = [];
let allObject2 = [];

let current_arr=[];


function Items(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

// Rendering Manually
Items.prototype.fill_data = function () {
  $("#id1").append(
    `        <section>
                    <h2>${this.title}</h2>
                    <img src="${this.image_url}" alt="">
                    <p>${this.description}</p>
                    <p>horns :${this.horns}</p>
                </section>
     `
  );
};

const ajaxSettings = {
  method: "get",
  dataType: "json",
};



// Get and fill page 1 data

$.ajax('data/page-1.json', ajaxSettings).then((data) => {
  data.forEach((details) => {

    let Object1 = new Items(details.image_url, details.title, details.description, details.keyword, details.horns);
    allObject.push(Object1);
    let new_keyword = true;


    keywords.forEach(element => {
      if (details.keyword == element) {
        new_keyword = false;
      }
    });

    if (new_keyword) {
      keywords.push(details.keyword);
      $("#selector").append(
        `        
          <option>${details.keyword}</option>
          `
      );
    }

    Object1.fill_data();
  });
});

// Get page 2 data

$.ajax('data/page-2.json', ajaxSettings).then((data) => {
  data.forEach((details) => {

    let Object1 = new Items(details.image_url, details.title, details.description, details.keyword, details.horns);
    allObject2.push(Object1);
    let new_keyword = true;

    keywords2.forEach(element => {
      if (details.keyword == element) {
        new_keyword = false;
      }
    });

    if (new_keyword) {
      keywords2.push(details.keyword);
    }
  });
});

// filter

let selector = $("#selector");

selector.change(function () {

  $("#id1").empty();

  allObject.forEach(element => {
    if (element.keyword == this.value) {
      element.fill_data();
    }
  });
});

current_arr=allObject;
// switch between pages

$("#btn_1").click(function () {
  current_arr=allObject;
  $("#id1").empty();
  allObject.forEach(element => {
    element.fill_data();
  });


  $("#selector").empty();
  $("#selector").append(
    `
      <option value="default">Filter by Keyword </option>
      `
  );
  keywords.forEach(element => {
    $("#selector").append(
      `        
        <option>${element}</option>
        `
    );
  });


});

$("#btn_2").click(function () {
  current_arr=allObject2;
  $("#id1").empty();
  $("#selector").empty();
  $("#selector").append(
    `
      <option value="default">Filter by Keyword </option>
      `
  );

  keywords2.forEach(element => {
    $("#selector").append(
      `        
        <option>${element}</option>
        `
    );
  });
  allObject2.forEach(element => {
    element.fill_data();
  });
});

$('#checkbox1').click(element => {
  let arr = current_arr.sort(sort_title);

  //*************************
  $("#id1").empty();
  
  arr.forEach(element => {
    element.fill_data();
  });
  
  // ******************************

});

$('#checkbox2').click(element => {
  const array = current_arr.sort(sort_horn); 
 
  //*************************
  $("#id1").empty();
  array.forEach(element => {
    element.fill_data();
  });
  // ******************************
  
});


function sort_horn(aa, bb) {
  const a = aa.horns;
  const b = bb.horns;

  if (a > b) {
    return -1;
  }
  if (b > a) {
    return 1;
  }
  return 0;
}

function sort_title(aa, bb) {
  const a = aa.title+'';
  const b = bb.title+'';

  if (a > b) {
    return 1;
  }
  if (b > a) {
    return -1;
  }
  return 0;
}