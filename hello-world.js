console.log("hello world");

function printPyramid() {
  for (i = 0; i < 5; i++) {
    let row = "";

    for (j = 0; j <= i; j++) {
      row += "* ";
    }

    console.log(row);
  }
}

printPyramid();
