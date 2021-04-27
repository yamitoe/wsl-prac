let con = mysql.createConnection({
    host: "myDB",
    user: "john",
    password: "123456"
  });
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    //After doing stuff
    con.close();
});

var person = {
    x: "ur",
    test: {test : this.x}

  };
  console.log(person["test"].test)

  let t = 3;
  function x(a){
      console.log(this.t);
      return  this.t +a;
  }
  console.log(typeof "true");

  console.log(x2);
console.log(x1);

let x1 = 10;
var x2 = 20;