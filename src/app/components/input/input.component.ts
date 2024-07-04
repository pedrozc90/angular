import { Component, Input } from "@angular/core";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"]
})
export class InputComponent {

    @Input("label")
    public label!: string;

    @Input("placeholder")
    public placeholder!: string;

    @Input("type")
    public type: string = "text";
    
    @Input("hint")
    public hint?: string;

    @Input("icon")
    public icon?: string;

}
