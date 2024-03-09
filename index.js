const headerturn = document.querySelector(`.burger-btn`);
const secondheader = document.querySelector(`.closed-nav`)

headerturn.addEventListener(`click`, function(evt) {
  headerturn.classList.toggle(`burger--turned`)
  secondheader.classList.toggle(`translate-nav`)
})

// ------------------------

document.querySelectorAll(".dropdown").forEach((item) => {
    item.addEventListener("click", function () {
        this.setAttribute("tabindex", 1);
        this.classList.toggle("active");
        this.querySelector(".dropdown-menu").style.display =
            this.classList.contains("active") ? "block" : "none";
    });

    item.addEventListener("focusout", function () {
        this.classList.remove("active");
        this.querySelector(".dropdown-menu").style.display = "none";
    });

    item.querySelector(".dropdown-menu")
        .querySelectorAll("li")
        .forEach((li) => {
            li.addEventListener("click", function () {
                this.closest(".dropdown").querySelector("span").textContent =
                    this.textContent;
                this.closest(".dropdown")
                    .querySelector("input")
                    .setAttribute("value", this.getAttribute("id"));
            });
        });
});

document.querySelectorAll(".dropdown-menu li").forEach((item) => {
    item.addEventListener("click", function () {
        var input =
            "" + this.closest(".dropdown").querySelector("input").value + "";
        var msg = "Hidden input value: ";
        document.querySelector(".msg").innerHTML = msg + input + "";
    });
});

// ------------------------

const rangeInput = document.querySelector('.range')
const rangeOutput = document.querySelector('#rangevalue')
let isRTL = document.documentElement.dir === 'rtl'

function handleInputChange(e) {
  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  } 
  const min = target.min
  const max = target.max
  const val = target.value
  let percentage = (val - min) * 100 / (max - min)
  if (isRTL) {
    percentage = (max - val) 
  }
  
  target.style.backgroundSize = percentage + '% 100%'
}

rangeInput.addEventListener('input', handleInputChange)

rangeOutput.addEventListener('input', handleInputChange)

// Handle element change, check for dir attribute value change
function callback(mutationList, observer) {  mutationList.forEach(function(mutation) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
      isRTL = mutation.target.dir === 'rtl'
    }
  })
}

// Listen for body element change
const observer = new MutationObserver(callback)
observer.observe(document.documentElement, {attributes: true})
