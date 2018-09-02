import { Component } from '@angular/core';
interface LayoutView {
    refinedByWidth: number;
    refinedByMax: number;
    refinedByMin: number;

    middleWidth: number;
    middleMax: number;
    middleMin: number;

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

        middleWidth: 30,
        middleMax: 40,
        middleMin: 20,

        previewWidth: 50,
        previewMax: 70,
        previewMin: 30
    }
}
