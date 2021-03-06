import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'mac-notes-splitter',
    templateUrl: './mac-notes-splitter.component.html',
    styleUrls: ['./mac-notes-splitter.component.scss']
})
export class MacNotesSplitterComponent implements OnInit {
    
    constructor() { }

    ngOnInit() {
    }
    snippetView = {
        direction: "horizontal",
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
    changeDir() {
        // this.snippetView.middleShow = !this.snippetView.middleShow;
        this.snippetView.direction = this.snippetView.direction === "horizontal" ? "vertical" : "horizontal"
    }
    collapsedChange(e) {
        if (e.collapsed) {
            this.snippetView.previewWidth = e.collapsedComponentSize + e.sizes[e.sizes.length - 1]
        } else {
            this.snippetView.previewWidth = e.sizes[e.sizes.length - 1] - e.collapsedComponentSize
        }
    }
    sizeChange(e) {
        // console.log(e)
    }
}
