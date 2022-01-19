const navigation = document.querySelector('.MainNavigation-list');
const hamby = document.querySelector('.Hamby');

hamby.addEventListener('click', function(){
    
    const expanded = JSON.parse(hamby.getAttribute('aria-expanded'));
    hamby.setAttribute('aria-expanded', !expanded);
    
    navigation.classList.toggle('is-visible');

    setTimeout(() => {
        navigation.classList.toggle('is-active');
    });
});