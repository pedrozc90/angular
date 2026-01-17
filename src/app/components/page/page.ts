import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    standalone: true,
    selector: "app-page",
    styleUrl: "./page.scss",
    templateUrl: "./page.html",
    imports: [
        CommonModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page {

}
