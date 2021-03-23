'use strict'

let keywords = [];
let allObject = [];

function Items (image_url,title,description,keyword,horns) {
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
                </section>
     `
    );
  };

  const ajaxSettings = {
    method: "get",
    dataType: "json",
  };

 

   
  $.ajax("../data/page-1.json", ajaxSettings).then((data) => {
    data.forEach((details) => {
      
      let Object1 = new Items(details.image_url,details.title,details.description,details.keyword,details.horns);
      allObject.push(Object1);
      let new_keyword = true;

      keywords.forEach(element =>{
        if(details.keyword==element){
          new_keyword = false;
        }
      });
      
      if(new_keyword){
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

  let selector = $("#selector");
  
  selector.change(function(){

    $("#id1").empty();

    allObject.forEach(element =>{
      if(element.keyword == this.value){
        element.fill_data();
      }
    });
  });
  



 