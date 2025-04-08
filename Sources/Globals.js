
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
let globalSearchItems = [];

let i;


for (i = 0; i < 11; i++) {
  globalTopicItems[i] = new C();
}

for (i = 0; i < 16; i++) {
  globalSearchItems[i] = new C();
}

export { globalStates, globalTopicHeadlines, globalTopicItems, globalSearchItems }
