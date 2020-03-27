class SomeKindOfSort {
  constructor(array) {
    this.array = array;
    this.counterHistory = [];
    this.resultHistory = [];
  }
  sort() {
    const result = [];
    const counterLength = Math.max(...this.array) + 1;
    const count = [];

    //Init arrays
    let size = this.array.length;
    while (size--) result.push(0);
    size = counterLength;
    while (size--) count.push(0);

    //
    for (let i = 0; i < this.array.length; i++) {
      count[this.array[i]] += 1;
      this.counterHistory.push({
        index: this.array[i],
        value: count[this.array[i]]
      }); //It's for visualization
    }
    for (let i = 1; i < counterLength; i++) {
      count[i] += count[i - 1];
      this.counterHistory.push({ index: i, value: count[i] }); //It's for visualization
    }

    for (let i = this.array.length - 1; i >= 0; i--) {
      result[count[this.array[i]] - 1] = this.array[i];
      this.resultHistory.push({
        from: i,
        to: count[this.array[i]] - 1,
        value: this.array[i]
      }); //It's for visualization
      count[this.array[i]] -= 1;
    }
    return result;
  }

  returnResultHistory() {
    return this.resultHistory;
  }
  returnCounterHistory() {
    return this.counterHistory;
  }
}

module.exports = SomeKindOfSort;
