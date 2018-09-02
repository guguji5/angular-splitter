import { Component, OnInit, Input, NgZone, ElementRef, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { TamSplitterPanelComponent } from '../tam-splitter-panel/tam-splitter-panel.component';
import index from './../../services/count'

interface IPoint {
    x: number;
    y: number;
}

@Component({
    selector: 'tam-splitter',
    templateUrl: './tam-splitter.component.html',
    styleUrls: ['./tam-splitter.component.css']
})
export class TamSplitterComponent implements OnInit {
    public readonly displayedPanels: Array<TamSplitterPanelComponent> = [];
    private readonly hidedPanels: Array<TamSplitterPanelComponent> = [];

    @Input() splitterBarWidth: number;
    currentbarNum: number;
    draggingWithoutMove: boolean;
    private readonly dragListeners: Array<Function> = [];
    direction: 'horizontal' | 'vertical' = 'horizontal';
    private isDragging: boolean = false;

    private readonly dragStartValues = {
        sizePixelContainer: 0,
        sizePixelA: 0,
        sizePixelB: 0,
        sizePercentA: 0,
        sizePercentB: 0,
    };

    constructor(private ngZone: NgZone, private elRef: ElementRef,
        private cdRef: ChangeDetectorRef,
        private renderer: Renderer2) {
    }

    ngOnInit() {
    }



    ngAfterViewInit() {
    }

    build() {
        // const totalUserSize = <number>this.displayedPanels.reduce((total: number, panel: TamSplitterPanelComponent) => {
        //     return panel.size ? total + Number(panel.size) : total
        // }, 0);
        // console.log(this.displayedPanels);
        // if (totalUserSize < 100) {
        //     const panelLength = this.displayedPanels.length;
        //     const averageSize = 100 / panelLength;
        //     this.displayedPanels.forEach((panel: TamSplitterPanelComponent, key: number) => {
        //         panel.setStyleFlexbasis(`calc( ${panel.size}% - ${this.splitterBarWidth * (this.displayedPanels.length - 1) / this.displayedPanels.length}px )`)
        //         panel.order = 2 * key;
        //     })
        // } else {
        //     this.displayedPanels.forEach((panel: TamSplitterPanelComponent, key: number) => {
        //         panel.setStyleFlexbasis(`calc( ${panel.size}% - ${this.splitterBarWidth * (this.displayedPanels.length - 1) / this.displayedPanels.length}px )`)
        //         panel.order = 2 * key;
        //     })
        // }

        if (this.displayedPanels.every(a => a.index !== null)) {
            this.displayedPanels.sort((a, b) => (<number>a.index) - (<number>b.index));
        }

        // Then set real order with multiples of 2, numbers between will be used by gutters.
        this.displayedPanels.forEach((panel: TamSplitterPanelComponent, key: number) => {
            panel.order = 2 * key;
        })
        this.refreshStyleSizes();
    }
    private refreshStyleSizes(): void {
        const sumbarSize = this.splitterBarWidth * (this.displayedPanels.length - 1);

        this.displayedPanels.forEach(panel => {
            panel.setStyleFlexbasis(`calc( ${panel.size}% - ${sumbarSize * panel.size / 100}px )`)
        });
    }

    addSplitterPanel(panel: TamSplitterPanelComponent): void {
        panel.index = index();
        if (panel.visible) {
            this.displayedPanels.push(panel)
        } else {
            this.hidedPanels.push(panel);
        }

        this.build();
    }

    public updateArea(panel: TamSplitterPanelComponent): void {
        // Only refresh if area is displayed (No need to check inside 'hidedAreas')

        const item = this.displayedPanels.find(a => a === panel);
        if (item) {
            this.build();
        }
    }
    public showArea(panel: TamSplitterPanelComponent): void {
        const area = this.hidedPanels.find(a => a === panel);

        if (area) {
            panel.setStyleVisibleAndDir(panel.visible, this.isDragging, this.direction);

            const areas = this.hidedPanels.splice(this.hidedPanels.indexOf(area), 1);
            this.displayedPanels.push(...areas);

            this.build();
        }
    }

    public hideArea(panel: TamSplitterPanelComponent): void {
        const area = this.displayedPanels.find(a => a === panel);

        if (area) {
            panel.setStyleVisibleAndDir(panel.visible, this.isDragging, this.direction);

            const areas = this.displayedPanels.splice(this.displayedPanels.indexOf(area), 1);
            // areas.forEach(area => {
            //     area.order = 0;
            //     // area.size = 0;
            // })
            this.hidedPanels.push(...areas);

            this.build();
        }
    }
    public removeArea(panel: TamSplitterPanelComponent): void {
        if (this.displayedPanels.some(a => a === panel)) {
            const area = <TamSplitterPanelComponent>this.displayedPanels.find(a => a === panel)
            this.displayedPanels.splice(this.displayedPanels.indexOf(area), 1);

            this.build();
        }
        else if (this.hidedPanels.some(a => a === panel)) {
            const area = <TamSplitterPanelComponent>this.hidedPanels.find(a => a === panel)
            this.hidedPanels.splice(this.hidedPanels.indexOf(area), 1);
        }
    }
    /* below function is used for the drag event */
    public startDragging(startEvent: MouseEvent | TouchEvent, barOrder: number, barNum: number): void {
        startEvent.preventDefault();

        // Place code here to allow '(gutterClick)' event even if '[disabled]="true"'.
        this.currentbarNum = barNum;
        this.draggingWithoutMove = true;
        this.ngZone.runOutsideAngular(() => {
            this.dragListeners.push(this.renderer.listen('document', 'mouseup', (e: MouseEvent) => this.stopDragging()));
            this.dragListeners.push(this.renderer.listen('document', 'touchend', (e: TouchEvent) => this.stopDragging()));
            this.dragListeners.push(this.renderer.listen('document', 'touchcancel', (e: TouchEvent) => this.stopDragging()));
        });


        const panelA = this.displayedPanels.find(a => a.order === barOrder - 1);
        const panelB = this.displayedPanels.find(a => a.order === barOrder + 1);

        if (!panelA || !panelB) {
            return;
        }

        const prop = (this.direction === 'horizontal') ? 'offsetWidth' : 'offsetHeight';
        this.dragStartValues.sizePixelContainer = this.elRef.nativeElement[prop];
        this.dragStartValues.sizePixelA = panelA.getSizePixel(prop);
        this.dragStartValues.sizePixelB = panelB.getSizePixel(prop);
        this.dragStartValues.sizePercentA = panelA.size;
        this.dragStartValues.sizePercentB = panelB.size;

        let start: {
            x: number;
            y: number;
        };
        if (startEvent instanceof MouseEvent) {
            start = {
                x: startEvent.screenX,
                y: startEvent.screenY,
            };
        }
        else if (startEvent instanceof TouchEvent) {
            start = {
                x: startEvent.touches[0].screenX,
                y: startEvent.touches[0].screenY,
            };
        }
        else {
            return;
        }

        this.ngZone.runOutsideAngular(() => {
            this.dragListeners.push(this.renderer.listen('document', 'mousemove', (e: MouseEvent) => this.dragEvent(e, start, panelA, panelB)));
            this.dragListeners.push(this.renderer.listen('document', 'touchmove', (e: TouchEvent) => this.dragEvent(e, start, panelA, panelB)));
        });
        this.isDragging = true;
    }

    private dragEvent(event: MouseEvent | TouchEvent, start: IPoint, panelA: TamSplitterPanelComponent, panelB: TamSplitterPanelComponent): void {
        if (!this.isDragging) {
            return;
        }

        let end: IPoint;
        if (event instanceof MouseEvent) {
            end = {
                x: event.screenX,
                y: event.screenY,
            };
        }
        else if (event instanceof TouchEvent) {
            end = {
                x: event.touches[0].screenX,
                y: event.touches[0].screenY,
            };
        }
        else {
            return;
        }
        this.draggingWithoutMove = false;
        this.drag(start, end, panelA, panelB);
    }

    private drag(start: IPoint, end: IPoint, panelA: TamSplitterPanelComponent, panelB: TamSplitterPanelComponent): void {
        // ¤ AREAS SIZE PIXEL

        const devicePixelRatio = window.devicePixelRatio || 1;
        let offsetPixel = (this.direction === 'horizontal') ? (start.x - end.x) : (start.y - end.y);

        // comment from damon.du  I don't know why we need this
        // offsetPixel = offsetPixel / devicePixelRatio;

        let newSizePixelA = this.dragStartValues.sizePixelA - offsetPixel;
        let newSizePixelB = this.dragStartValues.sizePixelB + offsetPixel;

        // if (newSizePixelA < this.splitterBarWidth && newSizePixelB < this.splitterBarWidth) {
        //     // WTF.. get out of here!
        //     return;
        // }
        // else if (newSizePixelA < this.splitterBarWidth) {
        //     newSizePixelB += newSizePixelA;
        //     newSizePixelA = 0;
        // }
        // else if (newSizePixelB < this.splitterBarWidth) {
        //     newSizePixelA += newSizePixelB;
        //     newSizePixelB = 0;
        // }

        // ¤ AREAS SIZE PERCENT

        if (newSizePixelA === 0) {
            panelB.size += panelA.size;
            panelA.size = 0;
        }
        else if (newSizePixelB === 0) {
            panelA.size += panelB.size;
            panelB.size = 0;
        }
        else {
            // NEW_PERCENT = START_PERCENT / START_PIXEL * NEW_PIXEL;
            if (this.dragStartValues.sizePercentA === 0) {
                panelB.size = this.dragStartValues.sizePercentB / this.dragStartValues.sizePixelB * newSizePixelB;
                panelA.size = this.dragStartValues.sizePercentB - panelB.size;
            }
            else if (this.dragStartValues.sizePercentB === 0) {
                panelA.size = this.dragStartValues.sizePercentA / this.dragStartValues.sizePixelA * newSizePixelA;
                panelB.size = this.dragStartValues.sizePercentA - panelA.size;
            }
            else {
                // based on the logical percentage panel width(A and B);
                panelA.size = this.dragStartValues.sizePercentA / this.dragStartValues.sizePixelA * newSizePixelA;
                panelB.size = (this.dragStartValues.sizePercentA + this.dragStartValues.sizePercentB) - panelA.size;

                if (panelA.size >= panelA.max) {
                    panelA.size = panelA.max;
                    panelB.size = (this.dragStartValues.sizePercentA + this.dragStartValues.sizePercentB) - panelA.size;
                } else if (panelA.size <= panelA.min) {
                    panelA.size = panelA.min;
                    panelB.size = (this.dragStartValues.sizePercentA + this.dragStartValues.sizePercentB) - panelA.size;
                } else {
                    panelB.size = (this.dragStartValues.sizePercentA + this.dragStartValues.sizePercentB) - panelA.size;
                }

                if (panelB.size >= panelB.max) {
                    panelB.size = panelB.max;
                    panelA.size = (this.dragStartValues.sizePercentA + this.dragStartValues.sizePercentB) - panelB.size;
                } else if (panelB.size <= panelB.min) {
                    panelB.size = panelB.min;
                    panelA.size = (this.dragStartValues.sizePercentA + this.dragStartValues.sizePercentB) - panelB.size;
                }

            }
        }

        this.refreshStyleSizes();
    }

    private stopDragging(): void {
        if (this.isDragging === false && this.draggingWithoutMove === false) {
            return;
        }

        while (this.dragListeners.length > 0) {
            const fct = this.dragListeners.pop();
            if (fct) {
                fct();
            }
        }

        this.isDragging = false;
        this.draggingWithoutMove = false;
    }
}
