window.onload = () => {
    function getOffset(element, parent) {
        var x = 0;
        var y = 0;
        while (
            element
            && (parent === null || element != parent)
            && !isNaN(element.offsetLeft)
            && !isNaN(element.offsetTop)) {
            // recursive position
            x += element.offsetLeft - element.scrollLeft;
            y += element.offsetTop - element.scrollTop;
            element = element.offsetParent;
        }
        return { x: x, y: y };
    }

    function scrollToTarget(targetElement, duration) {
        const scrollingElement = document.getElementById("wrapper");

        const elementY =
            getOffset(targetElement, scrollingElement).y
            + targetElement.offsetHeight / 2
            - window.innerHeight / 2;

        const targetY =
            Math.max(
                0,
                Math.min(
                    scrollingElement.scrollHeight,
                    elementY
                )
            );

        const startY = scrollingElement.scrollTop;
        const vector = targetY - startY;
        let startTimestamp = null;

        function step(newTimestamp) {
            if (startTimestamp === null) {
                startTimestamp = newTimestamp;
            }
            const progress = (newTimestamp - startTimestamp) / duration;

            if (progress >= 1) {
                targetElement.focus();
                return scrollingElement.scrollTop = targetY;
            }

            const currentYProgress = (-Math.cos(progress * Math.PI) + 1) / 2;
            scrollingElement.scrollTop = startY + currentYProgress * vector;
            window.requestAnimationFrame(step);
        }

        window.requestAnimationFrame(step);
    }

    const MenuState = {
        CLOSED: 0,
        OPENED: 1
    };

    function closeMenu() {
        const menuContainer = document.getElementById("navmenu");
        // 
    }

    function openMenu() {
        const menuContainer = document.getElementById("navmenu");
        // 
    }

    (() => {
        /* Initializing scrolling links */

        const scrollLinks = document.getElementsByClassName("goto-link");
        for (let index = 0; index < scrollLinks.length; index++) {
            const scrollLinkElement = scrollLinks[index];
            scrollLinkElement.addEventListener("click", (event) => {
                /* Prevent page reload */
                event.preventDefault();

                const targetId = scrollLinkElement.getAttribute("href");
                const targetElement = document.getElementById(targetId.substr(1));
                toggleMenu(MenuState.CLOSED);
                scrollToTarget(targetElement, 400);
            });
        }
    })();

    (() => {
        /* Initializing go to top visibility toggle */

        const scrollingElement = document.getElementById("wrapper");
        const goToTopLink = document.getElementById("goto-top-link");

        console.log("setup");

        function updateGoToTopVisibility() {
            if (scrollingElement.scrollTop <= window.innerHeight * 0.1) {
                console.log("hide");
                goToTopLink.classList.add("fade");
            }
            else {
                console.log("show");
                goToTopLink.classList.remove("fade");
            }
        }
        updateGoToTopVisibility();

        scrollingElement.onscroll = updateGoToTopVisibility;
    })();


    (() => {
        /* Initializing nav menu */
        const menuContainer = document.getElementById("navmenu");
        const toggleButton = document.getElementById("navmenu-toggler");

        function isMenuMobile() {
            return menuContainer.classList.contains("mobile");
        }
        let menuState = MenuState.CLOSED;

        function updateMenuState() {
            if (window.innerWidth < 960 && !menuIsTogglable) {
                menuIsTogglable = true;
                /* Hide menu, show toggle buton */
                menuContainer.classList.add("mobile");
                menuContainer.style = "display: none;";
                toggleButton.style = "display: block;"
            } else if (window.innerWidth >= 960 && menuIsTogglable) {
                menuIsTogglable = false;
                /* Hide menu, show toggle buton */
                menuContainer.classList.remove("mobile");
                menuContainer.style = "display: none;";
                toggleButton.style = "display: block;"
            }
        }

        window.onresize = updateMenuState;
        updateMenuState();

        toggleButton.addEventListener("click", (event) => {
            /* Prevent page reload */
            event.preventDefault();

            menuContainer.style = "display: block;";
            menuContainer.classList.add("");

        });
    })();

};
