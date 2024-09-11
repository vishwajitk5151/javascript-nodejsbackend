const fs = require('fs');

fs.writeFile("hey.txt", "hey hello kaise ho", function(err) {
    if (err) console.error(err);
    else console.log("done");
});
