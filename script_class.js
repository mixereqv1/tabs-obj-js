class Tabs {

  constructor() {
    this.updateTabsList();
    this.updateDeleteBtn();
    this.addTab();
  }

  getSideBar() {
    const SideBar = document.querySelector(".tabs__sidebar");
    return SideBar;
  }

  getTabsBtn() {
    const tabsBtn = document.querySelectorAll(".tabs__btn");
    return tabsBtn;
  }

  getBtnByTabNr(tabNr) {
    let tabsBtn = this.getTabsBtn();
    return [...tabsBtn].filter(button => {
      if (parseInt(button.dataset.tabNr) === tabNr) {
        return { ...button };
      }
    });
  }

  getTabsContent() {
    const tabsContent = document.querySelectorAll(".tabs__content");
    return tabsContent;
  }

  getTabsBtnActive() {
    const tabsBtnActive = document.querySelectorAll(".tabs__btn--active");
    return tabsBtnActive;
  }

  getDeleteBtn() {
    const deleteBtn = document.querySelectorAll(".tabBtn__deleteTab");
    return deleteBtn;
  }

  getLastTabNr() {
    return parseInt([...this.getSideBar().children].pop().dataset.tabNr);
  }

  getLastContentNr() {
    return parseInt(
      [...this.getTabsContent().children].pop().dataset.contentNr
    );
  }

  removeAllActiveFromTabs(TabsBtn) {
    TabsBtn.forEach(btn => {
      btn.classList.remove("tabs__btn--active");
    });
  }

  protectLastExistTab() {
    if (this.getDeleteBtn().length <= 1) {
      return false;
    }
    return true;
  }

  isTabsBtnActiveExist() {
    if (this.getTabsBtnActive().length === 0) {
      return false;
    }
    return true;
  }

  showTabAndContent(button, TabsBtn) {
    const tabNr = button.dataset.tabNr;
    this.removeAllActiveFromTabs(TabsBtn);

    button.classList.add("tabs__btn--active");

    this.getTabsContent().forEach(content => {
      let contentNr = content.dataset.contentNr;
      content.classList.remove("tabs__content--active");
      if (contentNr === tabNr) {
        content.classList.add("tabs__content--active");
      }
    });
  }

  updateTabsList(lastTabNr) {
	let TabsBtn = this.getTabsBtn();
    TabsBtn.forEach(button => {
      	button.addEventListener("click", () => {
        this.showTabAndContent(button, TabsBtn);
      });
    });
  }

  setAcitveTab() {
    if (!this.isTabsBtnActiveExist()) {
      const tabNr = this.getLastTabNr();

      let button = this.getBtnByTabNr(tabNr)[0];
      button.classList.add("tabs__btn--active");
      this.getTabsContent().forEach(content => {
        let contentNr = content.dataset.contentNr;
        content.classList.remove("tabs__content--active");
        if (parseInt(contentNr) === tabNr) {
          content.classList.add("tabs__content--active");
        }
      });
    }
  }

  removeTab(buttonParent) {
    let tabNr = buttonParent.dataset.tabNr;
    this.getTabsContent().forEach(content => {
      let contentNr = content.dataset.contentNr;

      if (contentNr === tabNr && this.protectLastExistTab()) {
        content.parentElement.removeChild(content);
        buttonParent.parentElement.removeChild(buttonParent);
      }
    });
  }

  updateDeleteBtn() {
    this.getDeleteBtn().forEach(delButton => {
      delButton.addEventListener("click", e => {
        this.removeTab(delButton.parentElement);
        this.setAcitveTab();
        e.stopPropagation();
      });
    });
  }

  addNewTab(tabSidebar) {
	const images = ['chrome.png','facebook.png','firefox.png','youtube.png'];
    let iconNumber = Math.floor(Math.random() * 4);

    let last = parseInt([...this.getSideBar().children].pop().dataset.tabNr);
    let newButton = document.createElement('div');
    let tabIcon = document.createElement('img');
    let tabTitle = document.createElement('span');

    tabIcon.src = 'img/' + images[iconNumber];

    newButton.classList.add("tabs__btn");
    tabTitle.classList.add('tab__title');
    tabIcon.classList.add('tab__icon');

    tabTitle.innerText = `Tab ${last + 1}`;  
    newButton.dataset.tabNr = last + 1;

    tabSidebar.appendChild(newButton);
    newButton.appendChild(tabIcon);
    newButton.appendChild(tabTitle);
        
    return newButton;
  }

  addNewDeleteBtn(newButton) {
    let newDeleteBtn = document.createElement('span');
    let delIcon = document.createElement('img');
    newDeleteBtn.classList.add("tabBtn__deleteTab");
    delIcon.classList.add('del__icon');
    delIcon.src = 'img/delete-icon.png';
    delIcon.title = 'Close tab';
    newButton.appendChild(newDeleteBtn);
    newDeleteBtn.appendChild(delIcon);
  }

  // addNewContent(tabSidebar) {
  //   let lastTabNr = this.getLastTabNr();
  //   let newContent = document.createElement("div");
  //   newContent.innerText = `tresc ${lastTabNr}`;
  //   newContent.classList.add("tabs__content");
  //   newContent.dataset.contentNr = lastTabNr;
  //   tabSidebar.parentElement.append(newContent);
  // }

  // addTabAndContent() {
  //   let addTabAndContentBtn = document.querySelector(".tabs__addBtn");
  //   addTabAndContentBtn.addEventListener("click", event => {
  //     let tabSidebar = event.target.parentElement;
  //     let newTab = this.addNewTab(tabSidebar);

  //     this.addNewDeleteBtn(newTab);
  //     this.addNewContent(tabSidebar);

  //     this.updateTabsList();
  //     this.updateDeleteBtn();
  //     this.getLastTabNr();
  //   });
  // }

  addButtonTab() {
    let tabSidebar = this.getSideBar();
    let newTab = this.addNewTab(tabSidebar);
    this.addNewDeleteBtn(newTab);
  }

  addContentTab() {
	let tabs = Array.from(this.getTabsBtn());
    let lastTabNr = this.getLastTabNr();
    let newContent = document.createElement("div");
    newContent.innerText = `Tab's content ${lastTabNr}`;
    newContent.classList.add("tabs__content");
	newContent.dataset.contentNr = lastTabNr;
    tabs[lastTabNr-1].appendChild(newContent);
  }

  addTab() {
    let addTabBtn = document.querySelector(".tabs__addBtn");
    addTabBtn.addEventListener("click", event => {
      //let tabSidebar = event.target.parentElement;

      this.addButtonTab();
      this.addContentTab();
      this.updateTabsList();
      this.updateDeleteBtn();
      this.getLastTabNr();
    });
  }
}

const runTabs = new Tabs();