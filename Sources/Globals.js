
class C {

  set content(val) {
    this.contentValue = val;
  }

  get content() {
    return this.contentValue;
  }
}

let globalStates = new C();
let globalTopicHeadlines = new C();

export {globalStates, globalTopicHeadlines}
