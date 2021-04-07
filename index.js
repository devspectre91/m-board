

//notice class---instantiates a notice


class Notice {
    constructor(title, category, id) {
        this.title = title;
        this.category = category;
        this.id = id;
    }
}

//UI Class- will contain stati methods
class UI {
    static displayNotices() {
        //   const storedNotices = [{ title: "Play more", category: "Sports" }, { title: "Learn new", category: "Tech" }];
        const notices = Store.getNotices();

        notices.forEach((noticeElement) => {
            UI.addNoticeToBoard(noticeElement);
        });
    }

    static addNoticeToBoard(notice) {
        let board = document.querySelector(".board");

        let div = document.createElement("div");
        div.classList.add("notice");
        div.dataset.id = notice.id;

        let span = document.createElement("span");
        span.classList.add("category", "editable");
        span.innerText = notice.category;

        let h2 = document.createElement("h2");
        h2.classList.add("title", "editable");
        h2.innerText = notice.title;

        div.append(span, h2);

        board.append(div);
    }
    static clearFields() {
        document.getElementById("notice-title").value = "";
        document.getElementById("category").value = "";
    }
    static handleDoubleClick(e) {

        if (e.target.classList.contains("editable")) {
            e.target.contentEditable = true;

        }
    }
    static handleBlur(e) {

        if (e.target.classList.contains("editable")) {
            let id = e.target.parentElement.dataset.id;
            let notices = Store.getNotices();
            console.log(notices)
            let index;
            notices.forEach((k, i, arr) => {

                if (k.id == id) { index = i };
            });
            console.log(index)

            if (e.target.classList.contains("category")) {
                notices[index].category = e.target.innerText;
            } else {
                notices[index].title = e.target.innerText;
            }
            localStorage.setItem("notices", JSON.stringify(notices));

        }
    }
}

//store class- handle local storage
class Store {
    static getNotices() {
        let notices;
        if (localStorage.getItem("notices") === null) {
            notices = [];
        } else {
            notices = JSON.parse(localStorage.getItem("notices"));
        }
        return notices;
    }
    static addNotice(notice) {
        let notices = Store.getNotices();
        //  notice.dataset.id=Date.now();

        notices.push(notice);
        localStorage.setItem("notices", JSON.stringify(notices));
    }

}

//Event-display notices
document.addEventListener("DOMContentLoaded", UI.displayNotices);
//Event- to add notices
document.querySelector(".input-box").addEventListener("submit", (e) => {
    e.preventDefault();

    let title = document.getElementById("notice-title").value;
    let category = document.getElementById("category").value;
    let id = Date.now();
    if (title && category) {
        const notice = new Notice(title, category, id);
        UI.addNoticeToBoard(notice);
        Store.addNotice(notice);

        UI.clearFields();
    }
});
//Event to edit the notices

document.addEventListener("click", UI.handleDoubleClick);
document.addEventListener("focusout", UI.handleBlur);