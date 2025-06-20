//* input parameters n >= 0 only

// start - number
// target - number

// stations - number[]
// shops - number[]

function minEnergy(start, target, stations, shops) {
  if (start === target && shops.length === 0) {
    return 0;
  }

  let stationsSet = new Set(stations);

  // store energy and shops need to go of each position
  let queue = [
    {
      position: start,
      energy: 0,
      shops: new Set(shops),
    },
  ];

  while (queue.length > 0) {
    let { position, energy, shops } = queue.shift();

    let newShops = new Set(shops);
    if (newShops.has(position)) newShops.delete(position);

    if (position === target && newShops.size === 0) return energy;

    // walk only
    for (let next of [position - 1, position + 1]) {
      if (next >= 0) {
        queue.push({ position: next, energy: energy + 1, shops: newShops });
      }
    }

    // walk above line + stations
    if (stationsSet.has(position)) {
      for (let s of stations) {
        if (s !== position) {
          queue.push({ position: s, energy, shops: newShops });
        }
      }
    }
  }

  return -1;
}

console.log(minEnergy(2, 7, [3, 6, 8], [4, 9]));
console.log(minEnergy(2, 7, [3, 6, 8], [4, 9, 7]));
console.log(minEnergy(2, 7, [3, 6, 8], [4]));
