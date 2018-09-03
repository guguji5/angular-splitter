import { Component, OnInit, Input, HostBinding, ElementRef, Renderer2 } from '@angular/core';
import { getOrCreateChangeDetectorRef } from '@angular/core/src/render3/di';

@Component({
    selector: 'tam-splitter-bar',
    templateUrl: './tam-splitter-bar.component.html',
    styleUrls: ['./tam-splitter-bar.component.css']
})
export class TamSplitterBarComponent implements OnInit {
    @Input() width;
    private _direction: 'vertical' | 'horizontal';

    @Input() set direction(v: 'vertical' | 'horizontal') {
        this._direction = v;
        this.refreshStyle();
    }

    get direction(): 'vertical' | 'horizontal' {
        return this._direction;
    }

    @Input() set order(v: number) {
        this.renderer.setStyle(this.elRef.nativeElement, 'order', v);
    }

    constructor(private elRef: ElementRef,
        private renderer: Renderer2) { }

    ngOnInit() {

    }
    private refreshStyle(): void {
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-basis', `${this.width}px`);
        // add a class to control the cursor
        this.renderer.removeClass(this.elRef.nativeElement, 'vertical');
        this.renderer.removeClass(this.elRef.nativeElement, 'horizental');
        this.renderer.addClass(this.elRef.nativeElement, this.direction);

        // fix safari bug about gutter height when direction is horizontal
        this.renderer.setStyle(this.elRef.nativeElement, 'height', (this.direction === 'vertical') ? `${this.width}px` : `100%`);

    }

}
