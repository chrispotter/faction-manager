#!/usr/bin/env node

const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

var factionJson = []

//no closing slash included
const baseUrl = "http://smashup.wikia.com"

const url = `${baseUrl}/wiki/Category:Factions`
const html = request(url, function(error, response, body){
  var $ = cheerio.load(body)
  var factions = $('.toccolours')

  factions.each(function(index, table){
    var setName = $("tbody tr th p a", table).attr("title");
    $("tbody tr:nth-child(2) td span a", table).each(function(i, faction){
      if(setName !== 'TITANS Event Kit') {
        var factionName = $(faction).attr('title');
        var factionDescription = $(`li a[title="${factionName}"]`).parent("li").not('.category-page__member').text();
        var imageUrl = baseUrl + $(faction).attr('href')
        factionJson.push({
          'name': factionName,
          'description': factionDescription.split('-').pop().trim(),
          'set': setName,
          'imageUrl': `images/${factionName.split(' ').join("_")}.png`
        })
        // request(imageUrl, function(imageError, imageResponse, imageBody){
        //   var $$ = cheerio.load(imageBody)
        //   var header = $$('.page-header__title').text()
        //   var image = $$('.thumbimage').last().attr('data-src');
        //   if(image){
        //     request(image).pipe(fs.createWriteStream(`images/${factionName.split(' ').join("_")}.png`));
        //   }
        // })
      }
      // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      // console.log(setName)
      // console.log(factionName + ":" + factionDescription.split('-').pop());
      // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    });
  })

  console.log(JSON.stringify(factionJson));
  // remove all comments
  // json.criteria = json.criteria.split('\n').map((line) => line.split('#')[0]).join('')
})

  