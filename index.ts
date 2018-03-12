export interface SpotfocusOptions {
    focusClass: string;
}

export enum Direction {
    TOP = 'top',
    BOTTOM = 'bottom',
    LEFT = 'left',
    RIGHT = 'right'
}

export interface FocusTarget {
    node: HTMLElement,
    direction: Direction
}

interface Point {
    x: number;
    y: number;
}

const defaultOpts = {
    focusClass: 'focus-connector'
}

let idx = 0;

export class Spotfocus {
    private options;
    private connectorPoints: Point[] = [];
    private svgRect: ClientRect;
    private svgEl: Element;
    private connectorEl: Element;
    private polygonUniqueClass: string = `polygon-${idx++}`;
    constructor(
        private container: HTMLElement,
        private targets: FocusTarget[], 
        options = {}) {
        this.options = Object.assign(defaultOpts, options);

        let svgTemplate = `<svg class="${this.polygonUniqueClass}" style="position: absolute;width: 100%;height: 100%;z-index: -1;">
            <polygon points="0,0" class="${this.options.focusClass}">
        </svg>`;
        this.container.insertAdjacentHTML('afterbegin', svgTemplate);
        this.svgEl = this.container.getElementsByClassName(this.polygonUniqueClass)[0];
        this.connectorEl = this.svgEl.getElementsByTagName('polygon')[0];
        this.redraw();
    }

    public redraw() {
        this.svgRect = this.svgEl.getBoundingClientRect();
        this.connectorPoints = this.targets.reduce((connectorPoints, target) => {
            let node = target.node;
            let rect = node.getBoundingClientRect();
            let relativeRect = this.getRelativeRect(rect, this.svgRect);
            let points = this.getPathPointsForTarget(relativeRect, target.direction);
            connectorPoints.push(...points);
            return connectorPoints;
        }, []);
        let path = this.getPathStringFromPoints(this.connectorPoints);
        this.drawPolygon(path);
    }

    private drawPolygon(path: string) {
        this.connectorEl.setAttribute('points', path);
    } 

    private getRelativeRect(rect: ClientRect, parentRect: ClientRect): ClientRect {
        let relativeRect: any = {
            width: rect.width,
            height: rect.height,
            top: rect.top - parentRect.top,
            left: rect.left - parentRect.left
        };
        relativeRect.bottom = relativeRect.top + relativeRect.height;
        relativeRect.right = relativeRect.left + relativeRect.width;
        return relativeRect;
    }

    private getPathPointsForTarget(rect: ClientRect, direction: Direction): Point[] {
        switch(direction) {
            case Direction.TOP:
                return [{x: rect.left, y: rect.top}, {x: rect.right, y: rect.top}];
            case Direction.BOTTOM:
                return [{x: rect.right, y: rect.bottom}, {x: rect.left, y:rect.bottom}];
            case Direction.LEFT:
                return [{x: rect.left, y: rect.bottom}, {x: rect.left, y:rect.top}];
            case Direction.RIGHT:
                return [{x:rect.right, y:rect.top}, {x: rect.right, y: rect.bottom}];
            default:
                return [];
        }
    }

    private getPathStringFromPoints(points: Point[]) {
        return points
            .map(p => `${p.x},${p.y}`)
            .join(' ');
    }
}