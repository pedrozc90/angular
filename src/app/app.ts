import { ChangeDetectionStrategy, Component, OnInit, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { environment } from "../environments/environment";

@Component({
    standalone: true,
    selector: "app-root",
    styleUrl: "./app.scss",
    templateUrl: "./app.html",
    imports: [RouterOutlet],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {
    
    protected readonly title = signal("blank");

    public ngOnInit(): void {
        console.log("Environment:", environment);
    }

}
