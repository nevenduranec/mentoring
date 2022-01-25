'use strict';
// without use strict, an assignment to a non-existing variable creates a new global variable, for compatibility with old code

const initMainNav = () => {

    const navigation = document.querySelector('.MainNavigation-list');
    const navigationItems = navigation.querySelectorAll('a');
    const hamby = document.querySelector('.Hamby');

    const open = () => {
        hamby.setAttribute('aria-expanded', 'true');
        navigation.classList.add('is-visible');
        
        setTimeout(() => navigation.classList.add('is-active'));
    };

    const close = () => {
        hamby.setAttribute('aria-expanded', 'false');
        navigation.classList.remove('is-active');
    };

    const handleClosure = event => !navigation.contains(event.target) && close();

    hamby.addEventListener('click', event => {
        event.stopPropagation();
        // we need to stop the event from bubbling up to the document and firing our click event which would close the navigation

        const expanded = JSON.parse(hamby.getAttribute('aria-expanded'));
        expanded ? close() : open();
    });

    navigation.addEventListener('transitionend', event => {
        event.target === navigation && 
        // since we have a transition on .Contact button, that event also bubbles up to this handler so we need to check if the element is navigation itself
        !event.target.classList.contains('is-active') &&
        // we need to remove the visible class only if the navigation is fully open, so we check for a is-active class
        navigation.classList.remove('is-visible');
    });


    document.addEventListener('click', handleClosure);
    document.addEventListener('focusin', handleClosure);

    navigationItems.forEach(link => link.addEventListener('click', () => close()));
};

const initHeader = () => {
    const h1 = document.querySelector('h1');
    const header = document.querySelector('header');

    const observer = new IntersectionObserver(entries => {
        entries[0].intersectionRatio < 1 ? header.classList.add('is-heading-stuck') : header.classList.remove('is-heading-stuck');
    }, {
        threshold: 1.0
    });

    observer.observe(h1);  
};

initMainNav();
initHeader();