import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-title",
    templateUrl: "./title.component.html",
    styleUrls: ["./title.component.scss"]
})
export class TitleComponent {

    public title!: string;

    constructor(private readonly route: ActivatedRoute) {
        this.route.title.subscribe((value) => {
            if (value) {
                this.title = value;
            }
        });
    }

}
