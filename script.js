async function loadData(){
  const resp = await fetch("Santiago/santiago_metro_simple.json");
  return await resp.json();
}

function sample(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function nextDeparture(deps, arrival){

  for(let t of deps){
    if(t >= arrival) return t;
  }

  // wrap to next day
  return deps[0] + 1440;
}

function minutesToClock(mins){

  mins = Math.floor(mins);

  let h = Math.floor(mins/60)%24;
  let m = mins%60;

  const ampm = h>=12 ? "PM":"AM";

  h = h%12;
  if(h===0) h=12;

  return `${h}:${m.toString().padStart(2,"0")} ${ampm}`;
}

function generateTrips(data, n=10){

  const trips = [];

  const lines = Object.keys(data.lines);

  for(let i=0;i<n;i++){

    const line = sample(lines);

    const stops = Object.keys(data.lines[line]);

    let start = sample(stops);
    let end = sample(stops);

    while(end===start){
      end = sample(stops);
    }

    const arrival = Math.random()*1440;

    const departures = data.lines[line][start];

    const next = nextDeparture(departures,arrival);

    const wait = next - arrival;

    trips.push({
      line,
      start,
      end,
      arrival,
      wait
    });

  }

  return trips;
}

function displayTrips(trips){

  const div = document.getElementById("trips");
  div.innerHTML="";

  let total=0;

  trips.forEach((t,i)=>{

    total += t.wait;

    const el = document.createElement("div");
    el.className="trip";

    el.innerHTML = `
    <b>Trip ${i+1}</b><br>
    Line: ${t.line}<br>
    Route: ${t.start} → ${t.end}<br>
    Arrival time: ${minutesToClock(t.arrival)}<br>
    Wait time: ${t.wait.toFixed(1)} minutes
    `;

    div.appendChild(el);

  });

  const avg = total / trips.length;

  document.getElementById("avg").innerText =
  "Average Wait: " + avg.toFixed(2) + " minutes";

}

async function main(){

  const data = await loadData();

  const trips = generateTrips(data,10);

  displayTrips(trips);

}

main();
