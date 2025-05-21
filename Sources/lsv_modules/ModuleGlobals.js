
// Server side module file

// Not working

class C {

  set content(val) {
    this.contentValue = val;
  }

  get content() {
    return this.contentValue;
  }
}

let globalStates = new C();

module.exports = { globalStates };