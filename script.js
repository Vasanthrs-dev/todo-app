"use strict";

const formType = document.querySelector(".form--input-type");
const formTextField = document.querySelector(".form--text-field");
const formSubBtn = document.querySelector(".form--submit");
const mainDate = document.querySelector(".main-date");
const actDuration = document.querySelector(".activity--duration");
const btmheader = document.querySelector(".activity--container");
const activityTextInput = document.querySelector(".activity-content-input");
const activityContent = document.querySelector(".activity-content");

class Todo {
  constructor(duration, content) {
    this.duration = duration;
    this.content = content;
  }
}

class App extends Todo {
  constructor(duration, content) {
    super(duration, content);
    formSubBtn.addEventListener("click", this._newActivity.bind(this));
    btmheader.addEventListener("click", this._editBtn.bind(this));
    btmheader.addEventListener("click", this._correctBtn.bind(this));
    btmheader.addEventListener("click", this._checkBtn.bind(this));
    btmheader.addEventListener("click", this._deleteBtn.bind(this));
    this._date();
  }

  _newActivity() {
    const type = formType.value;
    const content = formTextField.value;
    let color;
    if (content === "") return alert("Kindy enter your activity");
    if (type === "morning") color = "#69db7c";
    if (type === "afternoon") color = "#DDA94B";
    if (type === "evening") color = "#DF6589";
    const html = `
   <div class="bottom-activity">
          <div class="activity-duration" style = "background-color: ${color}">${type[0]}</div>
          <div class="activity-content-input hidden">
            <input type="text" class="activity--edit" />
          </div>
          <div class="activity-content">${content}</div>
          <div class="activity-btn">
            <button class="btn activity--edit-btn">
              <ion-icon class="btn-icon" name="pencil-outline"></ion-icon>
            </button>
            <button class="btn activity--check-btn">
              <ion-icon class="btn-icon" name="checkmark-outline"></ion-icon>
            </button>
            <button class="btn activity--correct-btn hidden">
              <ion-icon class="btn-icon" name="checkmark-done-outline"></ion-icon>
            </button>
            <button class="btn activity--delete-btn hidden">
              <ion-icon class="btn-icon" name="trash-bin-outline"></ion-icon>
            </button>
          </div>
    `;
    formTextField.value = "";
    btmheader.insertAdjacentHTML("beforeend", html);
  }

  _editBtn(event) {
    if (event.target.closest(".activity--edit-btn")) {
      // Find the nearest parent container with class 'bottom-activity'
      const activityContainer = event.target.closest(".bottom-activity");

      // Selecting the elements to hide and show
      const activityCorrectBtn = activityContainer.querySelector(
        ".activity--correct-btn"
      );
      const activityCheckBtn = activityContainer.querySelector(
        ".activity--check-btn"
      );
      const activityEditBtn = activityContainer.querySelector(
        ".activity--edit-btn"
      );
      const activityContent =
        activityContainer.querySelector(".activity-content");
      const activityContentInput = activityContainer.querySelector(
        ".activity-content-input"
      );
      const activityContentEdit =
        activityContentInput.querySelector(".activity--edit");

      const textValue = activityContent.textContent;
      // Add 'hidden' class to activity-content and remove 'hidden' from activity-content-input

      activityContent.classList.add("hidden");
      activityContentInput.classList.remove("hidden");
      activityCheckBtn.classList.add("hidden");
      activityCorrectBtn.classList.remove("hidden");
      activityEditBtn.classList.add("hidden");
      activityContentEdit.value = textValue;
      activityContentEdit.focus();
    }
  }

  _correctBtn(event) {
    if (event.target.closest(".activity--correct-btn")) {
      // Find the nearest parent container with class 'bottom-activity'
      const activityContainer = event.target.closest(".bottom-activity");
      // Selecting the elements to hide and show

      const activityCorrectBtn = activityContainer.querySelector(
        ".activity--correct-btn"
      );
      const activityContentEdit =
        activityContainer.querySelector(".activity--edit");
      const activityContent =
        activityContainer.querySelector(".activity-content");
      const activityContentInput = activityContainer.querySelector(
        ".activity-content-input"
      );
      const activityCheckBtn = activityContainer.querySelector(
        ".activity--check-btn"
      );
      const activityEditBtn = activityContainer.querySelector(
        ".activity--edit-btn"
      );

      let newTextContent = activityContentEdit.value;
      activityContent.textContent = newTextContent;

      activityContent.classList.remove("hidden");
      activityContentInput.classList.add("hidden");
      activityCorrectBtn.classList.add("hidden");
      activityCheckBtn.classList.remove("hidden");
      activityEditBtn.classList.remove("hidden");
    }
  }

  _checkBtn(event) {
    if (event.target.closest(".activity--check-btn")) {
      // Find the nearest parent container with class 'bottom-activity'
      const activityContainer = event.target.closest(".bottom-activity");

      // Selecting the elements to hide and show
      const activityEditBtn = activityContainer.querySelector(
        ".activity--edit-btn"
      );
      const activityCheckBtn = activityContainer.querySelector(
        ".activity--check-btn"
      );
      const activityDeleteBtn = activityContainer.querySelector(
        ".activity--delete-btn"
      );

      activityContainer.classList.add("strike");
      activityEditBtn.classList.add("hidden");
      activityCheckBtn.classList.add("hidden");
      activityDeleteBtn.classList.remove("hidden");
    }
  }

  _deleteBtn(event) {
    if (event.target.closest(".activity--delete-btn")) {
      // Find the nearest parent container with class 'bottom-activity'
      const activityContainer = event.target.closest(".bottom-activity");

      activityContainer.remove();
    }
  }

  _date() {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    mainDate.textContent = `${day}/${month + 1}/${year}`;
  }
}

const app = new App();
