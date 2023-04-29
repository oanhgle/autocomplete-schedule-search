import data from "./data.js";
import Trie from "./Trie.js";

// input field
const search = document.querySelector(".input__input");
const container = document.querySelector(".output__courses");

const trie = new Trie();
const map = {};

// load data from data array to trie and map data structure
data.forEach((obj) => {
  const subject = (obj.subj_crs + obj.title).replace(/\s/, '');
  trie.insert(subject.toLowerCase(), obj.crn);
  trie.insert(obj.title.replace(/\s/, '').toLowerCase(), obj.crn);
  const location = obj.bldg + " " + obj.room;
  const results = obj.subj_crs.trim().split(/\s+/);
  map[obj.crn] = [obj.status, results[0], results[1], obj.title, obj.sec, obj.crn, obj.instructor, obj.cap, obj.seatsremain, obj.cr, obj.day, obj.time, location] ;
});

// event handler
function handleSearch(event) {
  // extract the value from the input
  const input = event.currentTarget.value.trim();
  const input_wrm = input.toLowerCase().replace(/\s/, '');
  console.log(input);
  // call the autoComplete method using input
  const results = trie.autoComplete(input_wrm);

  // remove all current elements from the container
  container.innerHTML = "";

  // iterate through each element in the results array if results is value
  
  if (results !== -1) {
    results.forEach((course) => {
      const newTr = document.createElement("tr");
      for(let i = 0; i < 13; i++)
      {
        const newTd = document.createElement("td");
        newTd.classList.add("out");

        if(i===0)
        {
          if(map[course][0] === "Closed")
          {
            const newA = document.createElement("a");
            newA.classList.add("closed");
            newA.innerText = map[course][i];
            newTd.appendChild(newA);
          }
          else if(map[course][0] === "Open")
          {
            const newA = document.createElement("a");
            newA.classList.add("open");
            newA.innerText = map[course][i];
            newTd.appendChild(newA);
          }
          
        }

        else if(i === 2)
        {
          let str = map[course][1] + " " + map[course][2];
          if(input.length > map[course][1].length && str.toLowerCase().startsWith(input.toLowerCase()))
          {
            const boldText = document.createElement("a");
            boldText.classList.add("bold");
            boldText.innerText = str.substring(map[course][1].length + 1, input.length);
            newTd.appendChild(boldText);

            let unbold = str.substring(input.length);
            const newA = document.createElement("a");
            newA.innerText = unbold;
            newTd.appendChild(newA); 
          }
          else newTd.innerText = map[course][i];
        }

        else if (i===1 || i===3)
        {
          if(map[course][i].toLowerCase().startsWith(input.toLowerCase()) || input.toLowerCase().startsWith(map[course][i].toLowerCase()))
          {
            const boldText = document.createElement("a");
            boldText.classList.add("bold");
            boldText.innerText = map[course][i].substring(0, input.length);
            newTd.appendChild(boldText);

            let unbold = map[course][i].substring(input.length);
            const newA = document.createElement("a");
            newA.innerText = unbold;
            newTd.appendChild(newA); 
          }
          else newTd.innerText = map[course][i];
        }
        else if(i===5)
        {
          var a = document.createElement('a');
          var linkText = document.createTextNode(map[course][i]);
          a.appendChild(linkText);
          a.classList.add("link");
          a.title = map[course][i];
          a.href = "https://usfonline.admin.usf.edu/pls/prod/bwckschd.p_disp_listcrse?term_in=202301&subj_in=COT&crse_in=4601&crn_in=24282";
          a.target="_blank";
          newTd.appendChild(a);
        }
        else newTd.innerText = map[course][i];
        newTr.appendChild(newTd);
      }
      container.appendChild(newTr);
    });
  }
}

// event listener (on key up) to search field
search.addEventListener("keyup", handleSearch);
