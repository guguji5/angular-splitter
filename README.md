# angular-splitter
this is a angular splitter that could drag the responsive layout.

**Component `<tam-splitter>`**

@Input    | Type|Default|Details
-------- | ---|---|---
direction | string|"horizontal"|Select split direction: "horizontal" or "vertical".
splitterBarWidth    | number|8|Gutters's size (dragging elements) in pixels.

@Output|Param|Details
-------- | ---
sizeChange|{barNum: number, sizes: Array`<number>`}|Emit when draging, return the index of bar and the sizes of panels
**Component `<tam-splitter-panel>`**
@Input    | Type|Default|Details
-------- | ---
size | number|null|Size of the panel in percent (value between 0 and 100).all panels sizes should be equal to 100
max|number|null|Max size of the panel in percent (value between 0 and 100).
min|number|null|Min size of the panel in percent (value between 0 and 100).
visible|boolean|true|Allow to toggle panel visibility

@Output|Param|Details
-------- | ---
collapsedChange|{collapsed:boolean, sizes:  Array`<number>`, collapsedComponentSize: number}|Emit when collapsed or expand, return the collapsed, the sizes of panels and the size of collapsed panel

simple demo:
```
<tam-splitter splitterBarWidth=3 [direction]="horizontal" (sizeChange)="sizeChange($event)">
    <tam-splitter-panel [size]="20" [max]="30" [min]="10"
        [visible]=true (collapsedChange)="collapsedChange($event)">
        Refined By Panel
    </tam-splitter-panel>
    <tam-splitter-panel  [size]="30" [max]="50" [min]="20">
        Side List Panel
    </tam-splitter-panel>
    <tam-splitter-panel [size]="50" [max]="70" [min]="20">
        Preview Panel
    </tam-splitter-panel>
</tam-splitter>
```

nested demo:
```
<tam-splitter splitterBarWidth=3>
    <tam-splitter-panel [size]="20" [max]="30" [min]="10" (collapsedChange)="collapsedChange($event)">
        Refined By Panel
    </tam-splitter-panel>
    <tam-splitter-panel [size]="80">
        <tam-splitter splitterBarWidth=3 [direction]="'vertical'">
            <tam-splitter-panel [size]="30" [max]="40" [min]="20">
                Side List Panel
            </tam-splitter-panel>

            <tam-splitter-panel [size]="70" [max]="80" [min]="60">
                Preview Panel
            </tam-splitter-panel>
        </tam-splitter>
    </tam-splitter-panel>
</tam-splitter>
```
