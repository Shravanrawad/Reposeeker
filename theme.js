const $HTML = document.documentElement;
let isPressed = false;
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches; 

if(sessionStorage.getItem('theme')){
    $HTML.dataset.theme = sessionStorage.getItem('theme')
}
else {
   $HTML.dataset.theme = isDark ? "dark" : "light";
}

window.addEventListener('load', function(){
    const $themebtn  = document.querySelector('[data-theme-btn');
    $themebtn.addEventListener('click', changeTheme);
})

const changeTheme = function(){
 isPressed = isPressed ? false : true;
 this.setAttribute("aria-pressed", isPressed);
 $HTML.setAttribute("data-theme", ($HTML.dataset.theme === "light") ? "dark" : "light")
 sessionStorage.setItem('theme', $HTML.dataset.theme);
}

