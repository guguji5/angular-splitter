import { Component, OnInit, Optional, Renderer2, Input, ElementRef, HostBinding } from '@angular/core';
import { TamSplitterComponent } from '../tam-splitter/tam-splitter.component';

@Component({
    selector: 'tam-splitter-panel',
    templateUrl: './tam-splitter-panel.component.html',
    styleUrls: ['./tam-splitter-panel.component.css']
})
export class TamSplitterPanelComponent implements OnInit {
    private _order: number | null = null;
    private _size: number | null = null;
    @Input() set size(v: number | null) {
        this._size = Number(v);
        this.splitterComponent.updateArea(this);
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
    constructor(@Optional() public splitterComponent: TamSplitterComponent, private renderer: Renderer2, private elRef: ElementRef) { }

    ngOnInit() {
        if (this.splitterComponent) {
            this.splitterComponent.addSplitterPanel(this);
        }

        this.renderer.setStyle(this.elRef.nativeElement, 'flex-grow', '0');
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-shrink', '0');
    }

    public setStyleOrder(value: number): void {
        this.renderer.setStyle(this.elRef.nativeElement, 'order', value);
    }
    public setStyleFlexbasis(value: string): void {
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-basis', value);
    }

    public getSizePixel(prop: 'offsetWidth' | 'offsetHeight'): number {
        return this.elRef.nativeElement[prop];
    }

}
