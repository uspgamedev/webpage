window.onload = () => {
    interface Position {
        x: number;
        y: number;
    }

    function getOffset(element: HTMLElement, parent: Element | null): Position {
        let x = 0;
        let y = 0;
        while (
            element &&
            (!parent || element != parent) &&
            !isNaN(element.offsetLeft) &&
            !isNaN(element.offsetTop)
        ) {
            // recursive position
            x += element.offsetLeft - element.scrollLeft;
            y += element.offsetTop - element.scrollTop;
            element = element.offsetParent as HTMLElement;
        }

        return { x: x, y: y };
    }

    function scrollToTarget(targetElement: HTMLElement, duration: number): void {
        const scrollingElement: HTMLElement = document.getElementById("wrapper") as HTMLElement;

        const elementY: number =
            getOffset(targetElement, scrollingElement).y +
            targetElement.offsetHeight / 2 -
            window.innerHeight / 2;

        const targetY = Math.max(0, Math.min(scrollingElement.scrollHeight, elementY));

        const startY = scrollingElement.scrollTop;
        const vector = targetY - startY;
        let startTimestamp = -1;

        function step(newTimestamp: number): void {
            if (startTimestamp < 0) {
                startTimestamp = newTimestamp;
            }
            const progress = (newTimestamp - startTimestamp) / duration;

            if (progress >= 1) {
                scrollingElement.scrollTop = targetY;
                targetElement.focus();
                return;
            }
            const currentYProgress: number = (-Math.cos(progress * Math.PI) + 1) / 2;
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
            scrollLinkElement.addEventListener("click", (event: Event) => {
                /* Prevent page reload */
                event.preventDefault();

                const targetId: string = scrollLinkElement.getAttribute("href") ?? "#";
                const targetElement = document.getElementById(targetId.substr(1)) as HTMLElement;
                closeMenu();
                scrollToTarget(targetElement, 400);
            });
        }
    })();

    (() => {
        /* Initializing go to top visibility toggle */

        const scrollingElement: HTMLElement = document.getElementById("wrapper") as HTMLElement;
        const goToTopLink: HTMLElement = document.getElementById("goto-top-link") as HTMLElement;

        function updateGoToTopVisibility() {
            if (scrollingElement.scrollTop <= window.innerHeight * 0.1) {
                console.log("hide");
                goToTopLink.classList.add("fade");
            } else {
                console.log("show");
                goToTopLink.classList.remove("fade");
            }
        }
        updateGoToTopVisibility();

        scrollingElement.onscroll = updateGoToTopVisibility;
    })();

    (() => {
        /* Initializing nav menu */
        const menuContainer = document.getElementById("navmenu") as HTMLElement;
        const toggleButton = document.getElementById("navmenu-toggler") as HTMLElement;

        function isMenuMobile() {
            return menuContainer.classList.contains("mobile");
        }
        const menuState = MenuState.CLOSED;
        let menuIsTogglable: boolean;

        function updateMenuState() {
            if (window.innerWidth < 960 && !menuIsTogglable) {
                menuIsTogglable = true;
                /* Hide menu, show toggle buton */
                menuContainer.classList.add("mobile");
                menuContainer.setAttribute("style", "display: none;");
                toggleButton.setAttribute("style", "display: block;");
            } else if (window.innerWidth >= 960 && menuIsTogglable) {
                menuIsTogglable = false;
                /* Hide menu, show toggle buton */
                menuContainer.classList.remove("mobile");
                menuContainer.setAttribute("style", "display: none;");
                toggleButton.setAttribute("style", "display: block;");
            }
        }

        window.onresize = updateMenuState;
        updateMenuState();

        toggleButton.addEventListener("click", (event) => {
            /* Prevent page reload */
            event.preventDefault();

            menuContainer.setAttribute("style", "display: block;");
            menuContainer.classList.add("");
        });
    })();
};
