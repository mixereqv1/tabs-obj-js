class Tabs {
	constructor() {
		this.updateTabsList();
		this.updateDeleteBtn();
		this.addTabAndContent();
		console.log(this);
	}

	getTabsBtn() {
		const tabsBtn = document.querySelectorAll(".tabs__btn");
		return tabsBtn;
	}

	getTabsContent() {
		const tabsContent = document.querySelectorAll(".tabs__content");
		return tabsContent;
	}

	getDeleteBtn() {
		const deleteBtn = document.querySelectorAll(".tabBtn__deleteTab");
		return deleteBtn;
	}

	getSideBar() {
		const SideBar = document.querySelector(".tabs__sidebar");
		return SideBar;
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

	updateDeleteBtn() {
		this.getDeleteBtn().forEach(delButton => {
			delButton.addEventListener("click", e => {
				let buttonParent = delButton.parentElement;
				let tabNr = buttonParent.dataset.tabNr;
				this.getTabsContent().forEach(content => {
					let contentNr = content.dataset.contentNr;
					if (contentNr === tabNr) {
						content.parentElement.removeChild(content);
						buttonParent.parentElement.removeChild(buttonParent);
						this.showLastTabAndContent();
					}
				});
				e.stopPropagation();
			});
		});
	}

	addNewTab(tabSidebar) {
		let lastTabNr = this.getLastTabNr();
		let newButton = document.createElement("button");
		tabSidebar.append(newButton);
		newButton.innerText = `Tabs ${lastTabNr + 1}`;
		newButton.classList.add("tabs__btn");
		newButton.dataset.tabNr = lastTabNr + 1;
		return newButton;
	}

	addNewDeleteBtn(newButton) {
		let newDeleteBtn = document.createElement("span");
		newDeleteBtn.innerText = "X";
		newDeleteBtn.classList.add("tabBtn__deleteTab");
		newButton.append(newDeleteBtn);
	}

	addNewContent(tabSidebar) {
		let lastTabNr = this.getLastTabNr();
		let newContent = document.createElement("div");
		newContent.innerText = `tresc ${lastTabNr}`;
		newContent.classList.add("tabs__content");
		newContent.dataset.contentNr = lastTabNr;
		tabSidebar.parentElement.append(newContent);
	}

	addTabAndContent() {
		let addTabAndContentBtn = document.querySelector(".tabs__addBtn");
		addTabAndContentBtn.addEventListener("click", event => {
			let tabSidebar = event.target.parentElement;
			let newTab = this.addNewTab(tabSidebar);

			this.addNewDeleteBtn(newTab);
			this.addNewContent(tabSidebar);

			this.updateTabsList();
			this.updateDeleteBtn();
			this.getLastTabNr();
		});
	}
}

const runTabs = new Tabs();
//runTabs.init();