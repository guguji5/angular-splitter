import { Component, OnInit, Input, HostBinding, ElementRef, Renderer2 } from '@angular/core';
import { getOrCreateChangeDetectorRef } from '@angular/core/src/render3/di';

@Component({
  selector: 'tam-splitter-bar',
  templateUrl: './tam-splitter-bar.component.html',
  styleUrls: ['./tam-splitter-bar.component.css']
})
export class TamSplitterBarComponent implements OnInit {
  @Input() width;

  @HostBinding('style.width') get cssWidth() {
    return this.width ? `${this.width}px` : '100%';
  }


  @Input() set order(v: number) {
    this.renderer.setStyle(this.elRef.nativeElement, 'order', v);
  }

  constructor(private elRef: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {

  }

}
