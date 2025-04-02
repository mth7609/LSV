
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
let globalTopicItems = [];
let i;

for (i = 0; i < 11; i++) {
  globalTopicItems[i] = new C();
}

export { globalStates, globalTopicHeadlines, globalTopicItems }
