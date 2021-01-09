import Vec2 from "./vec2";

export default class DomUtil {
    public static getElementPosition(element: HTMLElement, parent: Element | null): Vec2 {
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

    public static scrollToTarget(
        scrollingElement: HTMLElement,
        targetElement: HTMLElement,
        duration: number
    ): void {
        const elementPosition: Vec2 = DomUtil.getElementPosition(targetElement, scrollingElement);
        const elementY: number =
            elementPosition.y + targetElement.offsetHeight / 2 - window.innerHeight / 2;

        const startY: number = scrollingElement.scrollTop;
        const targetY: number = Math.max(0, Math.min(scrollingElement.scrollHeight, elementY));
        const yVector: number = targetY - startY;
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

            const animationCurve: number = (-Math.cos(progress * Math.PI) + 1) / 2;
            scrollingElement.scrollTop = startY + animationCurve * yVector;
            window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
    }
}
