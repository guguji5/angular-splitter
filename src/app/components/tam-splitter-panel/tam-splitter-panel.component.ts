import { Component, OnInit, Optional, Renderer2, Input, ElementRef, HostBinding, Output, EventEmitter } from '@angular/core';
import { TamSplitterComponent } from '../tam-splitter/tam-splitter.component';

@Component({
    selector: 'tam-splitter-panel',
    templateUrl: './tam-splitter-panel.component.html',
    styleUrls: ['./tam-splitter-panel.component.scss']
})
export class TamSplitterPanelComponent implements OnInit {
    private _order: number | null = null;
    private _size: number | null = null;
    private _visible: boolean = true;
    public index: number;
    @Input() set size(v: number | null) {
        this._size = Number(v);
        this.splitterComponent.updatePanel(this);
    }

    get size() {
        return this._size;
    }
    @Input() set order(v: number | null) {
        v = Number(v);
        this._order = !isNaN(v) ? v : null;

        this.setStyleOrder(this._order);
    }

    get order(): number | null {
        return this._order;
    }


    @Input() max: number;
    @Input() min: number;
    @Input() set visible(v: boolean) {
        let sizeArr = this.splitterComponent.displayedPanels.map(value => value.size)
        // prevent the event fired in the init process
        if (sizeArr.length > 0) {
            if (this.splitterComponent.useTransition) {
                // if the useTransition is set true, then use 300 ms
                if (this.splitterComponent.useTransition === true) {
                    this.splitterComponent.setTransitionTime(300);
                } else {
                    this.splitterComponent.setTransitionTime(this.splitterComponent.useTransition);
                }
            }
            this.collapsedChange.emit({
                collapsed: !v,
                sizes: sizeArr,
                collapsedComponentSize: this.size
            })
            // after the collapse event, set the transition back to 0s;
            if (this.splitterComponent.useTransition) {
                if (this.splitterComponent.useTransition === true) {
                    setTimeout(() => {
                        this.splitterComponent.setTransitionTime(0);
                    }, 300)

                } else {
                    setTimeout(() => {
                        this.splitterComponent.setTransitionTime(0);
                    }, this.splitterComponent.useTransition)
                }
            }
        }

        v = (typeof (v) === 'boolean') ? v : (v === 'false' ? false : true);
        this._visible = v;
        if (this.visible) {
            this.splitterComponent.showPanel(this);
        }
        else {
            this.splitterComponent.hidePanel(this);
        }
    };

    get visible(): boolean {
        return this._visible;
    }
    @Output() collapsedChange: EventEmitter<any> = new EventEmitter();

    constructor(@Optional() public splitterComponent: TamSplitterComponent, public renderer: Renderer2, private elRef: ElementRef) { }

    ngOnInit() {
        if (this.splitterComponent) {
            this.splitterComponent.addPanel(this);
        }

        this.renderer.setStyle(this.elRef.nativeElement, 'flex-grow', '0');
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-shrink', '0');
    }
    ngOnDestroy(): void {

        this.splitterComponent.removePanel(this);
    }

    public setStyleOrder(value: number): void {
        this.renderer.setStyle(this.elRef.nativeElement, 'order', value);
    }
    public setStyleTransitionTime(value: string): void {
        this.renderer.setStyle(this.elRef.nativeElement, 'transition-duration', value);
    }
    public setStyleFlexbasis(value: string): void {
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-basis', value);
    }

    public getSizePixel(prop: 'offsetWidth' | 'offsetHeight'): number {
        return this.elRef.nativeElement[prop];
    }

    public setStyleVisibleAndDir(isVisible: boolean, isDragging: boolean, direction: 'horizontal' | 'vertical'): void {
        if (isVisible === false) {
            this.setStyleFlexbasis('0');
            this.renderer.setStyle(this.elRef.nativeElement, 'overflow-x', 'hidden');
            this.renderer.setStyle(this.elRef.nativeElement, 'overflow-y', 'hidden');

            if (direction === 'vertical') {
                this.renderer.setStyle(this.elRef.nativeElement, 'max-width', '0');
            }
        }
        else {
            this.renderer.setStyle(this.elRef.nativeElement, 'overflow-x', 'hidden');
            this.renderer.setStyle(this.elRef.nativeElement, 'overflow-y', 'auto');
            this.renderer.removeStyle(this.elRef.nativeElement, 'max-width');
        }

        if (direction === 'horizontal') {
            this.renderer.setStyle(this.elRef.nativeElement, 'height', '100%');
            this.renderer.removeStyle(this.elRef.nativeElement, 'width');
        }
        else {
            this.renderer.setStyle(this.elRef.nativeElement, 'width', '100%');
            this.renderer.removeStyle(this.elRef.nativeElement, 'height');
        }
    }
}
