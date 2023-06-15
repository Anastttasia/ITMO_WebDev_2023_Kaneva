var b=(l,t,e)=>{if(!t.has(l))throw TypeError("Cannot "+e)};var i=(l,t,e)=>(b(l,t,"read from private field"),e?e.call(l):t.get(l)),n=(l,t,e)=>{if(t.has(l))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(l):t.set(l,e)},a=(l,t,e,o)=>(b(l,t,"write to private field"),o?o.call(l,e):t.set(l,e),e);var s,d,c,r,u,p;class g{constructor(t,e,o,f,x){n(this,s,void 0);n(this,d,void 0);n(this,c,void 0);n(this,r,void 0);n(this,u,void 0);n(this,p,"");a(this,s,t),a(this,d,e),a(this,c,o),a(this,r,f),a(this,u,x)}set taskTitle(t){a(this,p,t)}render(){const t=document.createElement("div");t.innerHTML=`
    <div data-test-id="task-popup" class="flex flex-col min-w-[377px] bg-white p-6 rounded-2xl gap-y-4">
      <div class="flex flex-row justify-between">
        <span class="text-xl font-bold" data-id="title">${i(this,s)}</span>
        <button data-id="btnclose">
          <i class="iconify-inline text-neutral-400 hover:text-neutral-800 text-2xl"
            data-icon="radix-icons:cross-circled"></i>
        </button>
      </div>
      <div class="flex flex-row">
        <div class="flex flex-col w-full">
          <label class="ml-1 text-sm text-neutral-600" for="inpDate">Title: </label>
          <input 
          class="bg-neutral-100 p-1.5 rounded w-full border-1 border-neutral-200" 
          data-id="inpTitle" 
          type="text"
          value="${i(this,p)}"
          placeholder="e.g. Read books" />
        </div>
      </div>
      <div class="flex flex-row">
        <div class="flex flex-col w-full">
          <label class="ml-1 text-sm text-neutral-600" for="inpDate">End date: </label>
          <input class="bg-neutral-100 p-1.5 rounded w-full border-1 border-neutral-200" type="date" id="inpDate"
            name="trip-start" min="2018-01-01" />
        </div>
      </div>
      <div class="flex flex-row">
        <div class="flex flex-col w-full">
          <label for="countries" class="ml-1 text-sm text-neutral-600">Select tag:</label>
          <select id="countries"
            class="bg-neutral-100 p-1.5 rounded w-full border-1 border-neutral-200 focus:border-none">
            <option selected>Choose a tag</option>
            <option value="web">Web</option>
            <option value="update">Update</option>
            <option value="design">Design</option>
            <option value="content">Content</option>
          </select>
        </div>
      </div>
      <div class="flex flex-row pt-2">
        <button data-id="btnConfirm" class="bg-teal-600 text-white p-2 rounded-lg w-full font-bold">${i(this,c)}</button>
      </div>
    </div>
    `,console.log("div.firstChild",t.children);const e=t.children[0],o=e.querySelector('[data-id="btnclose"]'),f=e.querySelector('[data-id="btnConfirm"]'),x=e.querySelector('[data-id="inpTitle"]');return o.onclick=()=>{o.onclick=null,f.onclick=null,i(this,u).call(this)},f.onclick=()=>{const v=x.value,h=Date.now(),m=i(this,d)[0];i(this,r).call(this,v,h,m)},t.children[0]}}s=new WeakMap,d=new WeakMap,c=new WeakMap,r=new WeakMap,u=new WeakMap,p=new WeakMap;export{g as default};
