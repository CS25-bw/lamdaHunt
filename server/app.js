const treasureHunt = require("./axios_config");
const move = require("./graph");
var fs = require("fs");

// Create empty arrays and list to hold map and paths
let traversalPath = [];
let reversePath = [];
let map = {};
let graph = {};
let name_changed = false;

// Create a variable for the current room
let currentRoom = null;
let coolDown = 16; // To account for the 15 second cool down period

// Create a helper function to reverse the N, S, E, W direction
const reverse = direction => {
  let result = "";

  if (direction == "n") {
    result = "s";
  } else if (direction == "s") {
    result = "n";
  } else if (direction == "w") {
    result = "e";
  } else if (direction == "e") {
    result = "w";
  }

  return result;
};

// Initialize: this will just return the first room (room_id = 0)
treasureHunt
  .get("init")
  .then(res => {
    console.log("init: ", res.data);

    // Set the current_room to res.data
    currentRoom = res.data;

    // Print out the current room ID and the exits
    console.log("Room ID: ", currentRoom.room_id);
    console.log("Room exits: ", currentRoom.exits);

    // Set the cool down period to whatever it is in the current room
    coolDown = currentRoom.cooldown;
  })
  .catch(err => console.error(err));

// This function will hold all of the actual logic for moving through
// the map, picking things up, selling things, etc. and should continue
// until map.length==500
adventure = () => {
  let room_ID = currentRoom.room_id;
  let unexplored_rooms = [];

  console.log("Currently in room:", currentRoom.room_id);
  console.log("with:", currentRoom.items);

  //   Check if the current room is in the map object, and if not, add it
  if (!map[room_ID]) {
    map[room_ID] = {};
  }

  console.log("The map length is now: ", Object.keys(map).length);

  //   Add unexplored exits to the map with a X
  currentRoom.exits.forEach(exit => {
    if (map[room_ID][exit.toString()] == undefined) {
      map[room_ID][exit.toString()] = "?";
    }
  });

  graph[room_ID] = currentRoom;

  //   Create array of unexplored rooms
  for (var key in map[room_ID]) {
    if (map[room_ID][key] == "?") {
      unexplored_rooms.push(key);
    }
  }

  console.log("The remaining unexplored rooms are:\n", unexplored_rooms);

  // Create a helper function to move between rooms and pause for cool down
  // This uses the move() function from graph.js to move between the current and target room
  const toRoom = (current_room_id, target_room_id) => {
    const directions = move(current_room_id, target_room_id);
    console.log(
      "The directions to get to where you're going are: ",
      directions
    );

    directions.forEach(dir => {
      setTimeout(() => {
        treasureHunt
          .post("move", { direction: dir })
          .then(res => {
            coolDown = res.data.coolDown;
            currentRoom = res.data;
          })
          .catch(err => console.log(err));
      }, coolDown * 1000);
    });
  };

  // Helper functions for picking up treasure, selling treasure, and checking inventory/status
  const takeTreasure = treasure => {
    setTimeout(() => {
      treasureHunt
        .post("take", { name: treasure })
        .then(res => {
          console.log(res.data);
          console.log("💰💰💰 You found treasure 💰💰💰");
          coolDown = res.data.cooldown;
        })
        .catch(err => console.log("Error taking treasure: ", err, currentRoom));
    }, coolDown * 1000);
  };

  const sellTreasure = treasure => {
    if (!treasure.length) {
      if (!name_changed) {
        toRoom(1, 467);
      }
      return;
    }

    setTimeout(() => {
      treasureHunt
        .post("sell", { name: treasure, confirm: "yes" })
        .then(res => {
          sellTreasure(treasure.pop(0));
        })
        .catch(err =>
          console.log("Error selling inventory: ", err, currentRoom)
        );
    }, coolDown * 1000);
  };

  if (currentRoom.room_id === 1) {
    // Check if current room is the shop, and if so, try to sell available inventory
    setTimeout(() => {
      treasureHunt
        .post("status")
        .then(res => {
          console.log("Current inventory is:", res.data.inventory);
          treasure = [...res.data.inventory];
          sellTreasure(treasure);
        })
        .catch(err =>
          console.log("Error selling while on the map: ", err, currentRoom)
        );
    }, coolDown * 1000);
  }

  // Check if the room has items in it, and if so, pick them up
  if (currentRoom.items.length) {
    setTimeout(() => {
      treasureHunt
        .post("status")
        .then(res => {
          console.log("Current inventory is:", res.data.inventory);
          treasure = [...currentRoom.items];
          console.log("The item(s) you're about to pick up are: ", treasure);
          takeTreasure(treasure[0]);
        })
        .catch(err =>
          console.log(
            "Error picking up treasure while on the map: ",
            err,
            currentRoom
          )
        );
    }, coolDown * 1000);
  }

  // // Check if the currrent room allows you to change names
  if (currentRoom.room_id === 467 && !name_changed) {
    setTimeout(() => {
      treasureHunt
        .post("change_name", {
          name: "Colin Dismuke",
          confirm: "aye"
        })
        .then(res => {
          coolDown = res.data.cooldown;
          name_changed = true;
        })
        .catch(err => console.log("Error changing names: ", err, currentRoom));
    }, coolDown * 1000);
  }

  setTimeout(() => {
    treasureHunt
      .post("status")
      .then(res => {
        console.log("🕰️ Checking status: ", res.data);
        inventory = [...res.data.inventory];
        strength = res.data.strength;
        // if (inventory.length >= strength) {
        //   toRoom(currentRoom.room_id, 1);
        // }
      })
      .catch(err => console.log("Error while showing status: ", err));
  }, coolDown * 1000);

  /* 
  The following conditional will handle:
  1. Free movement: there is nothing stopping the explorer from moving to another room
  2. Dead end: the explorer can reverse his/her path until a room has an unexplored exit
  3. Dead end at start: the whole map should have been traversed

  Based on the above, the if statements should have these conditions:
  1. unexplored_rooms > 0
  2. unexplored_rooms == 0 && reversePath.length
  3. unexplored_rooms == 0 && reversePath.length == 0

  TODO: Add in the logic that picks up treasure, etc.
  */

  if (unexplored_rooms.length > 0) {
    console.log("Free to explore 🏃🏼‍");
    // Pick a room from the unexplored_rooms array
    let move_forward = unexplored_rooms[0];
    unexplored_rooms = [];

    // Add the next move to the traversalPath array
    traversalPath.push(move_forward);

    // Add the opposite direction move to the reversePath array
    let reverse_move = reverse(move_forward);
    reversePath.push(reverse_move);

    /*
    Use setTimeout and POST('move') to move to the next room

    Add the new room_id to the map
    Add the exits to the map
    Add the opposite direction move to the map
    Change cool down to current room cool down
    */
    setTimeout(() => {
      treasureHunt
        .post("move", { direction: move_forward })
        .then(res => {
          console.log("Moved forward 🏹");
          // Save room_id to previous_room_id and set new currentRoom
          let previous_room_id = room_ID;
          currentRoom = res.data;

          // Update the map with the path forward from the previous room
          map[previous_room_id][move_forward] = currentRoom.room_id;

          // Set a new room_id
          let new_room_id = currentRoom.room_id;

          if (
            currentRoom.room_id === 499 ||
            currentRoom.title.toLowerCase().includes("shrine")
          ) {
            treasureHunt
              .post("pray")
              .then(res => (coolDown = res.data.cooldown))
              .catch(err => console.log("Error praying:", err, currentRoom));
          }

          // Check if the new_room_id is in the map object, and if not, add it
          if (!map[new_room_id]) {
            map[new_room_id] = {};
          }

          // console.log("The map length is now:", Object.keys(map).length);

          // Add unexplored exits for the new room to the map with a X
          currentRoom.exits.forEach(exit => {
            if (map[new_room_id][exit.toString()] == undefined) {
              map[new_room_id][exit.toString()] = "?";
            }
          });

          // Update new rooms reverse_move room with the previous_room_id
          map[new_room_id][reverse_move] = previous_room_id;

          // console.log("The map now looks like this:\n", map);

          graph[new_room_id] = currentRoom;

          // console.log("The graph length is now:", Object.keys(graph).length);

          // // Write out the current graph to graph_data.json (updates every move)
          fs.writeFile(
            "./graph_data.json",
            JSON.stringify(graph, null, 2),
            "utf-8",
            function(err, result) {
              if (err) console.log("error", err);
            }
          );

          // // Write out the current map to map_data.json (updates every move)
          fs.writeFile(
            "./map_data.json",
            JSON.stringify(map, null, 2),
            "utf-8",
            function(err, result) {
              if (err) console.log("error", err);
            }
          );

          // console.log("Finished writing map and graph data to disk.");

          // Set the cooldown to the current room's cool down length
          coolDown = res.data.cooldown;

          if (Object.keys(map).length !== 500) {
            setTimeout(() => {
              adventure();
            }, coolDown * 1000);
          }
        })
        .catch(err => console.log("Error moving forward: ", err));
    }, coolDown * 2700);

    // Check if map.length == 500 and if not, loop through adventure() again
  } else if (unexplored_rooms.length == 0 && reversePath.length) {
    console.log("Dead end ☠️");
    // Get last move from reversePath array
    let reversed_path = reversePath.pop();

    // Add the reversed move to the traversalPath
    traversalPath.push(reversed_path);

    // Use setTimeout and POST('move') to move to the reversed room
    setTimeout(() => {
      treasureHunt
        .post("move", { direction: reversed_path })
        .then(res => {
          currentRoom = res.data;
          coolDown = res.data.cooldown;

          if (Object.keys(map).length !== 500) {
            setTimeout(() => {
              adventure();
            }, coolDown * 1000);
          }
        })
        .catch(err =>
          console.log(
            "There was a problem reversing out of a dead end: ",
            err,
            currentRoom
          )
        );
    }, coolDown * 1000);
  } else if (unexplored_rooms.length == 0 && reversePath.length == 0) {
    console.log(
      "It looks like you've explored the whole map...congratulations! 🎊\nJust to be sure, the current map length is: ", // TODO: Add confetti emoji
      Object.keys(map).length
    );

    return map;
  }
};

// Run the adventure function (while will continue till map.length==500)
// while waiting the correct amount of time between each move
setTimeout(() => {
  adventure();
}, coolDown * 1000);
