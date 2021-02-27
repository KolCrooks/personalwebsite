export interface WorldSettings {
  size: [x: number, y: number, z: number];
  cubeSize: [x: number, y: number, z: number];
  stepTime: number;
}

export interface WorldState {
  cubes: Int8Array;
  time: number;
}

export function to1D(
  pos: [x: number, y: number, z: number],
  dims: [max_x: number, max_y: number, max_z: number]
) {
  return pos[0] + pos[1] * dims[0] + pos[2] * dims[0] * dims[1];
}

export function to3D(
  i: number,
  dims: [max_x: number, max_y: number, max_z: number]
): [x: number, y: number, z: number] {
  let z = Math.floor(i / (dims[0] * dims[1]));
  i -= Math.floor(z * dims[0] * dims[1]);
  let y = Math.floor(i / dims[0]);
  let x = Math.floor(i % dims[0]);
  return [x, y, z];
}

export function doGameOfLife(
  state: Int8Array,
  size: [max_x: number, max_y: number, max_z: number]
) {
  const newState = new Int8Array(state.length);

  for (let i = 0; i < newState.length; i++) {
    const tdPos = to3D(i, size);
    let neighbors = 0;

    // Calculate number of neighbors
    for (let x = -1; x <= 1; x += 2)
      for (let y = -1; y <= 1; y += 2)
        for (let z = -1; z <= 1; z += 2) {
          const nX = tdPos[0] + x;
          if (nX < 0 || nX >= size[0]) continue;
          const nY = tdPos[1] + y;
          if (nY < 0 || nY >= size[1]) continue;
          const nZ = tdPos[2] + z;
          if (nZ < 0 || nZ >= size[2]) continue;

          const index = to1D([nX, nY, nZ], size);

          neighbors += +state[index];
        }
    /*
      Live cells with less than 7 neighbours die of underpopulation.
      Live cells with more than 17 neighbours die of overpopulation.
      Dead cells with 8 neighbours live by reproduction.
      Live cells with 7 to 17 neighbours live on to the next generation.
      */
    if (state[i] === 1) {
      //Alive
      newState[i] = +(neighbors >= 7 && neighbors <= 17);
    } else {
      //Dead
      newState[i] = +(neighbors === 2);
    }
  }
  return newState;
}
