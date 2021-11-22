/*
    File: script-main.js
    GUI Assignment: jQuery Dynamic Multiplication Table
    Cameron Benassi, UMass Lowell Computer Science, cameron_benassi@student.uml.edu 
    Copyright (c) 2021 by Cameron.  All rights reserved.  May be freely copied or excerpted 
    for educational purposes with credit to the author. updated by CB on November 21, 2021
*/

$(function() {
    //generates table on page load
    generate();
    
    //function to create a new tab when "Save Table" button is pressed
    //takes numbers, converts them into a string, inserts the string into a <li> element with a link which goes into the tab <ul>
    $("#saveTable").click(function() {
        var low1 = document.getElementById("firstLow").value;
        var high1 = document.getElementById("firstHigh").value;
        var low2 = document.getElementById("secondLow").value;
        var high2 = document.getElementById("secondHigh").value;
        
        var del = "<li><a id=\""+low1+high1+low2+high2+"\" href=\"#\" class=\"delete\">X -></a></li>";
        var name = "<li class=\"tab\" id=\""+low1+high1+low2+high2+"t\"><a href=\"#\" onclick=\"generateWithValues(" + low1 + "," + high1 + "," + low2 + "," + high2 + ");\">| " + low1 + " to "+ high1 + " by " + low2 + " to " + high2 + " |   </a></li>";
        $("#tabList").append(del);
        $("#tabList").append(name);
    });

    //function to delete tab groups, deletes the icon & tab
    $(document).on("click", ".delete", function(){
        var id = "#" + event.target.id;
        var idT = "#" + event.target.id + "t";
        $(id).remove();
        $(idT).remove();
    });
    
    //turns the tabContainer div into jQuery tabs
    $("#tabContainer").tabs();

    //selects all elements in the form "numbers" and validates off of the given rules
    $("#numbers").validate({
        rules: {
            firstLow: {
                required: true,         //field is required
                number: true,           //field must contain a number
                min: -50,               //mininum value is -50
                max: 50                 //maximum value is 50
            },
            firstHigh: {
                required: true,
                number: true,
                min: -50,
                max: 50
            },
            secondLow: {
                required: true,
                number: true,
                min: -50,
                max: 50
            },
            secondHigh: {
                required: true,
                number: true,
                min: -50,
                max: 50
            }
            
        }
    });
    
    //functions for sliders
    $("#slider1Low").slider({
        min: -50,
        max: 50,
        value: 0,
        slide: function(event, ui) {
            $("#firstLow").val(ui.value);
            generate();
        }
        
    });
    $("#slider1High").slider({
        min: -51,
        max: 51,
        value: 0,
        slide: function(event, ui) {
            $("#firstHigh").val(ui.value);
            generate();
        }
    });
    $("#slider2Low").slider({
        min: -51,
        max: 51,
        value: 0,
        slide: function(event, ui) {
            $("#secondLow").val(ui.value);
            generate();
        }
    });
    $("#slider2High").slider({
        min: -51,
        max: 51,
        value: 0,
        slide: function(event, ui) {
            $("#secondHigh").val(ui.value);
            generate();
        }
    });

    //change slider position if input is manually typed in
    $("#firstLow").change(function(ui){
        var newVal = $("#firstLow").val();
        $("#slider1Low").slider("value", newVal);
        generate();
    });
    $("#firstHigh").change(function(ui){
        var newVal = $("#firstHigh").val();
        $("#slider1High").slider("value", newVal);
        generate();
    });
    $("#secondLow").change(function(ui){
        var newVal = $("#secondLow").val();
        $("#slider2Low").slider("value", newVal);
        generate();
    });
    $("#secondHigh").change(function(ui){
        var newVal = $("#secondHigh").val();
        $("#slider2High").slider("value", newVal);
        generate();
    });
});

function generate (){

    //getting values from form, resets table
    var firstLow = document.getElementById("firstLow").value;
    var firstHigh = document.getElementById("firstHigh").value;
    var secondLow = document.getElementById("secondLow").value;
    var secondHigh = document.getElementById("secondHigh").value;
    document.getElementById("results").innerHTML = "";


    //swapping values if orders are wrong
    if(firstLow > firstHigh){
        var temp = firstHigh;
        firstHigh = firstLow;
        firstLow = temp;
    }
    if(secondLow > secondHigh){
        var temp2 = secondHigh;
        secondHigh = secondLow;
        secondLow = temp2;
    }

    //#####creating table#####
    //Adding blank element 
    addElement("", "th");

    //populating top header, starts calculations on new row
    for(i = firstLow; i <= firstHigh; i++){
        addElement(i, "th");
    }
    addElement("", "tr");

    //for loop to populate remainder of table, finishes on new row
    for(i = secondLow; i <= secondHigh; i++){  
        addElement(i, "th");

        for(j = firstLow; j <= firstHigh; j++){
            addElement(i * j, "td");
        }
        addElement("", "tr");
    }
}

function generateWithValues (firstLow, firstHigh, secondLow, secondHigh){

    //resets table
    document.getElementById("results").innerHTML = "";

    //swapping values if orders are wrong
    if(firstLow > firstHigh){
        var temp = firstHigh;
        firstHigh = firstLow;
        firstLow = temp;
    }
    if(secondLow > secondHigh){
        var temp = secondHigh;
        secondHigh = secondLow;
        secondLow = temp;
    }

    //#####creating table#####
    //Adding blank element 
    addElement("", "th");

    //populating top header, starts calculations on new row
    for(i = firstLow; i <= firstHigh; i++){
        addElement(i, "th");
    }
    addElement("", "tr");

    //for loop to populate remainder of table, finishes on new row
    for(i = secondLow; i <= secondHigh; i++){  
        addElement(i, "th");

        for(j = firstLow; j <= firstHigh; j++){
            addElement(i * j, "td");
        }
        addElement("", "tr");
    }
}

//function to create table element
function addElement(content, type){
    var node = document.createElement(type);
    var textNode = document.createTextNode(content);
    node.appendChild(textNode);
    document.getElementById("results").appendChild(node);
}


