var mongoose = require('mongoose');
var Campground = require('./modules/campground');
var Comment = require('./modules/comment');

//Some staring material for the website homepage!!
var startingData =[
{name:"Salmon creek",
image:"https://cdn.hiconsumption.com/wp-content/uploads/2019/07/Best-Affordable-Camping-Gear-000-Hero.jpg",
description: "Salmon creek is a peaceful place to be!"
},
{name:"Granitite Hill",
image:"https://www.tripsavvy.com/thmb/ekAcrsKGhqVjsQvxnMJpjv1ymvw=/2137x1403/filters:fill(auto,1)/sunrise-camping--676019412-5b873a5a46e0fb0050f2b7e0.jpg",
description: "Granitite Hill offers wide variety of molten lava reserves in solid form."
},
{name:"Himalayan valley",
image:"https://www.tripsavvy.com/thmb/ekAcrsKGhqVjsQvxnMJpjv1ymvw=/2137x1403/filters:fill(auto,1)/sunrise-camping--676019412-5b873a5a46e0fb0050f2b7e0.jpg",
description: "Granitite Hill offers wide variety of molten lava reserves in solid form."
},
{name:"Thar desert",
image:"https://www.tripsavvy.com/thmb/ekAcrsKGhqVjsQvxnMJpjv1ymvw=/2137x1403/filters:fill(auto,1)/sunrise-camping--676019412-5b873a5a46e0fb0050f2b7e0.jpg",
description: "Granitite Hill offers wide variety of molten lava reserves in solid form."
},
{name:"Mountain Goat's rest",
image:"https://www.newzealand.com/assets/Tourism-NZ/Nelson/ba40378fe9/img-1536928144-4748-13836-F53C3949-ED9E-E0DC-CF6EC0D789D9308A__FocalPointCropWzI0MCw0ODAsNTAsNTAsNzUsImpwZyIsNjUsMi41XQ.jpg",
description: "Granitite Hill offers wide variety of molten lava reserves in solid form."
}];


function seedDB(){
  Campground.deleteMany({},function(err){
    if(err)
    console.log(err);
    else {
      console.log("removed campgrounds");

      //seeding the DB with the staringData
      startingData.forEach(function(seed){
        Campground.create(seed, function(err, campground){
          if(err){
            console.log(err);
          }else{
            console.log("added " + seed.name + " --> ");
            Comment.create({
              text:"Lovely Place. But no internet.",
              author:"Homie"
            }, function(err, comment){
              if(err)
              console.log(err);
              else {
                campground.comments.push(comment);
                campground.save();
                console.log("Created new comment!");
              }
            });
          }
        });
      });
    }
  });
}


module.exports = seedDB;
