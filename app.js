const $header = document.querySelector('[data-header]');
window.addEventListener('scroll', function(){
   if(window.scrollY > 50){
    $header.classList.add('active')
   }
   else {
    $header.classList.remove('active')
   }
})

const $searchToggler = document.querySelector('[data-search-toggler]');
const $searchfield = document.querySelector('[data-search-field]');
let isExpanded = false; 

$searchToggler.addEventListener('click', function(){
    $header.classList.toggle('search-active')
    isExpanded = isExpanded ? false : true;
    this.setAttribute('aria-expanded', isExpanded);
    $searchfield.focus();
})

/**
 * @param {NodeList} $elemnts
 * @param {string} eventType
 * @param {function} callback
 */

const addEventOnElements = function($elemnts, eventType, callback){
    for(const $item of $elemnts){
        $item.addEventListener(eventType, callback);
    }
}

function showpanel(page){
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.style.display = 'none';
    })

    document.querySelector(`#${page}`).style.display = 'block'
}


let tabbtn = document.querySelectorAll('.tab-btn');
tabbtn.forEach(btn => {
    btn.addEventListener('click', function(){
        showpanel(this.dataset.page);
    })
})


document.addEventListener('click' ,function(e){
  if(e.target.tagName === 'BUTTON'){
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
  }
})


