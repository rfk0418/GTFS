<script>
async function loadData() {
  const resp = await fetch("Santiago/santiago_metro.json");
  return await resp.json();
}

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function nextDeparture(departures, currentTime) {
  for (let t of departures) if (t >= currentTime) return t;
  return departures[0] + 24*60; // wrap around next day
}

function minutesToTime(mins) {
  let h = Math.floor(mins / 60) % 24;
  let m = Math.floor(mins % 60);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if(h===0) h=12;
  return `${h}:${m.toString().padStart(2,'0')} ${ampm}`;
}

function generateTrips(data, numTrips = 10) {
  const trips = [];
  const stopNames = Object.keys(data.stops);
  const tripList = Object.values(data.trips);

  for (let i=0; i<numTrips; i++) {
    // 1️⃣ Pick random start
    const startStop = sample(stopNames);
    const startLines = data.stops[startStop];
    const startLine = sample(startLines);

    // 2️⃣ Pick trips on start line that include startStop
    const possibleTrips = tripList.filter(t => t.line===startLine && t.stops.some(s=>s.name===startStop));
    if(possibleTrips.length===0) continue;
    const trip = sample(possibleTrips);

    const startIndex = trip.stops.findIndex(s=>s.name===startStop);

    // 3️⃣ Pick end station: sometimes same line, sometimes transfer
    let endStop, endLine, transfer=null, transferLine=null;
    if(Math.random()<0.7) {
      // 70% chance: same line
      const endIndex = startIndex + Math.floor(Math.random()*(trip.stops.length-startIndex));
      endStop = trip.stops[endIndex].name;
      endLine = startLine;
    } else {
      // Transfer case
      // pick random end on a different line
      let otherStops = stopNames.filter(s => s!==startStop && data.stops[s].some(l=>l!==startLine));
      endStop = sample(otherStops);
      const endLines = data.stops[endStop].filter(l=>l!==startLine);
      endLine = sample(endLines);

      // find transfer station (intersection of startLine and endLine)
      const transferCandidates = stopNames.filter(s => data.stops[s].includes(startLine) && data.stops[s].includes(endLine));
      if(transferCandidates.length>0) transfer = sample(transferCandidates);
      transferLine = endLine;
    }

    // 4️⃣ Random arrival at start
    const currentTime = Math.random()*24*60;

    // 5️⃣ Wait at origin
    const startTripStop = trip.stops[startIndex];
    const startDepTimes = Array.isArray(startTripStop.dep)? startTripStop.dep : [startTripStop.dep];
    const startDep = nextDeparture(startDepTimes, currentTime);
    const waitStart = startDep - currentTime;

    // 6️⃣ Wait at transfer (if any)
    let waitTransfer = 0;
    if(transfer) {
      // find a trip on transferLine that stops at transfer
      const transferTrips = tripList.filter(t => t.line===transferLine && t.stops.some(s=>s.name===transfer));
      if(transferTrips.length>0) {
        const transferTrip = sample(transferTrips);
        const transferIndex = transferTrip.stops.findIndex(s=>s.name===transfer);
        const transferDepTimes = Array.isArray(transferTrip.stops[transferIndex].dep)? transferTrip.stops[transferIndex].dep : [transferTrip.stops[transferIndex].dep];
        const arrivalAtTransfer = startDep + 5; // assume ~5 min travel from start to transfer
        const transferDep = nextDeparture(transferDepTimes, arrivalAtTransfer);
        waitTransfer = transferDep - arrivalAtTransfer;
      }
    }

    trips.push({
      start: startStop,
      startLine,
      end: endStop,
      endLine,
      transfer,
      waitStart,
      waitTransfer,
      totalWait: waitStart + waitTransfer,
      arrivalTime: minutesToTime(currentTime)
    });
  }

  return trips;
}

function displayTrips(trips) {
  const container = document.getElementById("trips");
  container.innerHTML = "";
  let totalWaitSum = 0;
  trips.forEach((trip,i)=>{
    totalWaitSum += trip.totalWait;
    const div = document.createElement("div");
    div.className = "trip";
    div.innerHTML = `<strong>Trip ${i+1}:</strong> ${trip.start} (${trip.startLine}) → ${trip.end} (${trip.endLine})<br>
      Arrival at start: ${trip.arrivalTime}, Wait at origin: ${trip.waitStart.toFixed(1)} min
      ${trip.transfer ? `<br>Transfer at ${trip.transfer}, Wait: ${trip.waitTransfer.toFixed(1)} min` : ""}`;
    container.appendChild(div);
  });
  const avg = totalWaitSum / trips.length;
  document.getElementById("avgWait").innerText = `Average wait time across trips: ${avg.toFixed(1)} minutes`;
}

async function main() {
  const data = await loadData();
  const trips = generateTrips(data,10);
  displayTrips(trips);
}

main();
</script>
