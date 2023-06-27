class newElementTable {
    #qty;
    #cost
    #total;
    constructor(qty, cost) {
      this.#qty = qty;
      this.#cost = cost;
      this.#total = qty * cost;
    }
  
    #itemTitle = '';
  
    set itemTitle(value) {
      this.#itemTitle = value;
    }
  
    render() {
      const div = document.createElement('div');
      div.innerHTML =
        `
        <div class="flex flex-row font-bold text-gray-600 border-b-2 border-gray-200">
            <div class="basis-1/2">
              <span>${this.#itemTitle}</span>
            </div>
            <div class="basis-1/2 flex flex-row">
              <div class="basis-1/2 flex flex-row">
                <span class="mr-28">${this.#qty}</span>
                <span class="flex flex-row">${this.#cost}</span>
            </div>
            <div class="basis-1/2 flex flex-row justify-end">
                <span class="flex flex-row">${this.#total}</span>
            </div>
            </div>
        </div>
      `;
  
      return div.children[0];
    }
  }
  
  export default newElementTable;







