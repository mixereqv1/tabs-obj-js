var Tabs = {

    addTabAndContentBtn: document.querySelector('.tabs__addBtn'),

    getTabsBtn: function() {
        const tabsBtn = document.querySelectorAll('.tabs__btn');
        return tabsBtn
    },

    getTabsContent: function() {
        const tabsContent = document.querySelectorAll('.tabs__content');
        return tabsContent
    },

    getDeleteBtn: function() {
        const deleteBtn = document.querySelectorAll('.tabBtn__deleteTab');
        return deleteBtn
    },

    getSideBar: function() {
        const SideBar = document.querySelector('.tabs__sidebar');
        return SideBar
    },

    getLastNrTab: function() {
        return [...this.getSideBar().children].pop()
    },
    getLastNrContent: function() {
        return [...this.getTabsContent().children].pop()
    },

    updateTabsList: function() {
        let TabsBtn = this.getTabsBtn();
        TabsBtn.forEach((button) => {
            button.addEventListener('click', () => {
                const tabNr = button.dataset.tabNr;
                TabsBtn.forEach(btn => {
                    btn.classList.remove("tabs__btn--active");
                })
                button.classList.add("tabs__btn--active");
                this.getTabsContent().forEach(content => {
                    let contentNr = content.dataset.contentNr;
                    content.classList.remove("tabs__content--active");
                    if (contentNr === tabNr) {
                        content.classList.add("tabs__content--active");
                    }
                })
            })
        })
    },

    updateDeleteBtn: function() {
        this.getDeleteBtn().forEach((delButton) => {
            delButton.addEventListener('click', (e) => {
                let buttonParent = delButton.parentElement;
                let tabNr = buttonParent.dataset.tabNr
                this.getTabsContent().forEach(content => {
                    let contentNr = content.dataset.contentNr;;
                    if (contentNr === tabNr) {
                        content.parentElement.removeChild(content);
                        buttonParent.parentElement.removeChild(buttonParent);
                    }
                })
                e.stopPropagation();
            })
        })
    },

    addNewTab: function(tabSidebar) {
        let last = parseInt([...this.getSideBar().children].pop().dataset.tabNr);
        let newButton = document.createElement('button');
        tabSidebar.appendChild(newButton);
        newButton.innerText = `Tabs ${last + 1}`;
        newButton.classList.add("tabs__btn");
        newButton.dataset.tabNr = last + 1;
        return newButton;
    },

    addNewDeleteBtn: function(newButton) {
        let newDeleteBtn = document.createElement('span');
        newDeleteBtn.innerText = 'X';
        newDeleteBtn.classList.add("tabBtn__deleteTab");
        newButton.appendChild(newDeleteBtn);
    },

    addNewContent: function(tabSidebar) {
        let last = parseInt([...this.getSideBar().children].pop().dataset.tabNr);
        let newContent = document.createElement('div');
        newContent.innerText = `asd ${last}`;
        newContent.classList.add("tabs__content");
        newContent.dataset.contentNr = last;
        tabSidebar.parentElement.appendChild(newContent);
    },

    addTabAndContent: function() {
        this.addTabAndContentBtn.addEventListener('click', (event) => {
            let tabSidebar = event.target.parentElement;
            let newButton = this.addNewTab(tabSidebar);

            this.addNewDeleteBtn(newButton);
            this.addNewContent(tabSidebar)

            this.updateTabsList();
            this.updateDeleteBtn();
            this.getLastNrTab();
        })
    },

    init: function() {
        this.updateTabsList();
        this.updateDeleteBtn();
        this.addTabAndContent()
    }

}

Tabs.init();