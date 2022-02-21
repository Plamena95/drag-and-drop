$(document).ready(function () {
document.getElementById(`add-section`).addEventListener("click", create);
function drag() {
  $(`.draggable`)
    .find(`.draggable-section`)
    .each((i, el) => {
      let dragSection = $(el).draggable();
      $(dragSection).on("dragstart", (event) => {
        dragged = event.target;
        $(dragged).css({ opacity: `0.5`, width: `95%` });
      });
      $(`.droppable`).droppable({
        drop: function (e) {
          let droppedItem = $(`.draggable-section`);
          $(this).append(dragged);
          droppedItem.draggable()
          $(dragged).css({
            top: "0",
            left: "0",
            opacity: `1`,
            margin: `auto`,
            "margin-bottom": `10px`,
          });
          turnBack();
          multiple()
        },
      });
    });
}
function turnBack() {
  let dragged;
  $(`.droppable`)
    .find(`.draggable-section`)
    .each((i, a) => {
      let dragSection = $(a).draggable();
      $(dragSection).on("dragstart", (event) => {
        dragged = event.target;
        $(dragged).css({ opacity: `0.5`, width: `95%` });
        $(`.draggable`).droppable({
          drop: function (e) {
            $(this).draggable();
            let droppedItem = $(`.draggable-section`);
            $(this).append(dragged);
            droppedItem.draggable()
            $(dragged).css({
              top: "0",
              left: "0",
              opacity: `1`,
              margin: `auto`,
              "margin-bottom": `10px`,
            });
            $(droppedItem).addClass(`drag-true`);
          },
        });
      });
    });
}
function multiple() {
  let dragged
  $(`.draggable`)
    .find(`.draggable-section`)
    .each((i, el) => {
     let dragSection= $(el).draggable();
      $(dragSection).on("dragstart", (event) => {
        dragged = event.target;
        $(dragged).css({ opacity: `0.5`, width: `95%` });
        $(`.ui-draggable`).droppable({
          drop: function () {
            $(this).append(dragged);
            $(el).addClass(`drag-true`);
            $(el).css({
              width: "75%",
              left: "8%",
              "margin-top": "10px",
              "margin-bottom": "10px",
              opacity: "1",
            });
          },
        });
      });
    });
}
function create() {
  let first = document.querySelector(`.title`).value;
  let second = document.querySelector(`.url`).value;
  let dragDrop = document.createElement("article");
  dragDrop.setAttribute("draggable", "true");
  if (first == `` || second == ``) {
    alert(`Fill the empthy fields!`);
  } else {
    dragDrop.innerHTML = `
    <p class="my-0 col-5">${first}</p>
    <p class="url my-0 col-5">${second}</p>
    <button class="delete-section btn btn-danger col-2">Delete</button>
    <button class="edit-section btn btn-warning col-2">Edit</button>
    `;
    document.querySelector(`.title`).value = ``;
    document.querySelector(`.url`).value = ``;
    dragDrop.classList.add(`draggable-section`, `current-info`);
    let parent = document.querySelector(`.draggable`);
    parent.appendChild(dragDrop);
    $(dragDrop).css({
      width: "95%",
      margin: "auto",
      "margin-bottom": "10px",
    });
    $(`.delete-section`).click(function () {
      $(this).parent().remove();
    });
  }
  drag();
  turnBack();
  editInfo()
}
function editInfo(){
  $(`.edit-section`).each((i,b)=>{
    let sum=1
    b.addEventListener("click",function(){
      sum++
        let message = `
        <p class="message">To finish editing press "Edit"!</p>`;
        $(this).parent().find(`p`).attr("contenteditable", "true");
          let parent=$(b).parent()
          $(parent).append(message);
          $(parent).draggable(`disable`)
          if(sum%2!==0){
            $(this).parent().find(`p`).attr("contenteditable", "false");
            $(`.message`).remove()
            $(parent).draggable(`enable`)
          }
        $(`.draggable-section`).each((i,g)=>{
          let count=Array.from($(g).children(`.message`))
          if(count.length>1){
            $(count).each((i,m)=>{
              i++
              $(count[i]).remove()

            })
          }
        })
      })
    })

}
editInfo()
document
  .querySelector(`.generate button`)
  .addEventListener(`click`, createNavBar);
function createNavBar() {
  $(`.navbar`).remove();
  let containerDroppable = document.querySelector(`.droppable`);
  if (containerDroppable.children.length > 0) {
    let newEl = `<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand col-1" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto"></ul>
      </div>
      </nav>
         `;
    let container = document.querySelector(`.main`);
    $(container).append(newEl);

    let SectionLength = Array.from(
      containerDroppable.querySelectorAll(`.draggable-section`)
    );

    if (SectionLength.length > 0) {
      $(`.droppable`)
        .children(`.draggable-section`)
        .each((i, el) => {
          let containerLength = $(el).children(`.draggable-section`).length;
          if (containerLength > 0) {
            let dropDown = ` 
                          <li class="nav-item dropdown col-1">
                                   <a class="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${$(
                                     el
                                   )
                                     .children(`:first`)
                                     .text()}
                                   </a>
                                   <div class="dropdown-menu" aria-labelledby="navbarDropdown"></div>
                                   </li>
                                 `;

            $(el)
              .children(`.draggable-section`)
              .each((i, el) => {
                i++;
                let dropEl = ` <a class="dropdown-item" href="https://${$(el)
                  .children(`.url`)
                  .text()}">${$(el).children(`:first`).text()}</a>`;
                $(`.navbar-nav`).append(dropDown);
                $(`.dropdown-menu`).append(dropEl);
              });
          } else {
            let titleValue = $(el).children(`:first`).text();
            let createEl = `<li class="nav-item active col-1">
                                        <a class="nav-link" href="https://${$(
                                          el
                                        )
                                          .children(`.url`)
                                          .text()}/">${titleValue}<span class="sr-only"></span></a>
                                      </li>`;
            $(`.navbar-nav`).append(createEl);
          }
        });
    }
  }
}
})