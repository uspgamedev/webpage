import { assert } from "console";
import DomUtil from "./domutil";
import PageConstants from "./pageconstants";

export default class WindowHooks {
    private scrollContainer: HTMLElement;
    private scrollLinks: HTMLCollectionOf<Element>;

    constructor() {
        this.scrollContainer = document.getElementById(
            PageConstants.SCROLL_ELEMENT_ID
        ) as HTMLElement;
        this.scrollLinks = document.getElementsByClassName("goto-link");

        assert(
            this.scrollContainer !== null,
            `Could not find scroll container element (#${PageConstants.SCROLL_ELEMENT_ID})`
        );
    }

    public initializeSmoothScrollLinks(): void {
        for (let index = 0; index < this.scrollLinks.length; index++) {
            const scrollLinkElement = this.scrollLinks[index];
            scrollLinkElement.addEventListener("click", (event: Event) => {
                /* Prevent page reload */
                event.preventDefault();

                const targetId: string = scrollLinkElement.getAttribute("href") ?? "#";
                const targetElement = document.getElementById(targetId.substr(1)) as HTMLElement;

                DomUtil.scrollToTarget(this.scrollContainer, targetElement, 400);
            });
        }
    }

    public initializeGoToTopLinkVisibility(): void {
        const scrollContainer: HTMLElement = this.scrollContainer;
        const goToTopLink: HTMLElement = document.getElementById("goto-top-link") as HTMLElement;

        const updateGoToTopVisibility = (): void => {
            if (scrollContainer.scrollTop <= window.innerHeight * 0.1) {
                console.log("hide");
                goToTopLink.classList.add("fade");
            } else {
                console.log("show");
                goToTopLink.classList.remove("fade");
            }
        };

        updateGoToTopVisibility();
        scrollContainer.onscroll = updateGoToTopVisibility;
    }

    /* (() => {
        //  Initializing nav menu
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
                //  Hide menu, show toggle buton
                menuContainer.classList.add("mobile");
                menuContainer.setAttribute("style", "display: none;");
                toggleButton.setAttribute("style", "display: block;");
            } else if (window.innerWidth >= 960 && menuIsTogglable) {
                menuIsTogglable = false;
                //  Hide menu, show toggle buton
                menuContainer.classList.remove("mobile");
                menuContainer.setAttribute("style", "display: none;");
                toggleButton.setAttribute("style", "display: block;");
            }
        }

        window.onresize = updateMenuState;
        updateMenuState();

        toggleButton.addEventListener("click", (event) => {
            //  Prevent page reload
            event.preventDefault();

            menuContainer.setAttribute("style", "display: block;");
            menuContainer.classList.add("");
        });
    })(); */
}
