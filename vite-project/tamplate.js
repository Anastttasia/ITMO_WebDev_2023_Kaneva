class newElementTable {
    #qty;
    #cost
    #total;
    constructor(qty, cost, total) {
      this.#qty = qty;
      this.#cost = cost;
      this.#total = total;

    }
  
    #taskTitle = '';
  
    set taskTitle(value) {
      this.#taskTitle = value;
    }
  
    render() {
      const div = document.createElement('div');
      div.innerHTML =
        `
        <div class="flex flex-row font-bold text-gray-600 border-b-2 border-gray-400">
            <div class="basis-1/2">
              <span>Item</span>
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
  
      const popup = div.children[0];
  
      const domBtnClose = popup.querySelector('[data-id="btnclose"]');
      const domBtnConfirm = popup.querySelector('[data-id="btnConfirm"]');
      const domInpTitle = popup.querySelector('[data-id="inpTitle"]');
  
      domBtnClose.onclick = () => {
        domBtnClose.onclick = null;
        domBtnConfirm.onclick = null;
        this.#closeCallback();
      };
  
      domBtnConfirm.onclick = () => {
        const taskTitle = domInpTitle.value;
        const taskDate = Date.now();
        const taskTags = this.#tags[0];
        this.#confirmCallback(taskTitle, taskDate, taskTags);
      };
  
      return div.children[0];
    }
  }
  
  export default newElementTable;







