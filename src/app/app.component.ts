import { Component } from '@angular/core';
interface LayoutView {
    refinedByWidth: number;
    refinedByMax: number;
    refinedByMin: number;
    refineByShow: boolean;

    middleWidth: number;
    middleMax: number;
    middleMin: number;
    middleShow: boolean;

    previewWidth: number;
    previewMax: number;
    previewMin: number;

}
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'angular';
    snippetView: LayoutView = {
        refinedByWidth: 20,
        refinedByMax: 30,
        refinedByMin: 10,
        refineByShow: true,

        middleWidth: 30,
        middleMax: 40,
        middleMin: 20,
        middleShow: true,

        previewWidth: 50,
        previewMax: 70,
        previewMin: 30
    }

    collapse() {
        this.snippetView.refineByShow = !this.snippetView.refineByShow;
    }
    change() {
        this.snippetView.middleShow = !this.snippetView.middleShow;
    }
    collapsedChange(e) {
        if (e.collapsed) {
            this.snippetView.previewWidth = e.collapsedComponentSize + e.sizes[e.sizes.length - 1]
        } else {
            this.snippetView.previewWidth = e.sizes[e.sizes.length - 1] - e.collapsedComponentSize
        }
    }
}
