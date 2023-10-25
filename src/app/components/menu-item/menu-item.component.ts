import { Component, Input } from "@angular/core";
import { MenuItem } from "../menu/menu.component";

@Component({
    selector: "app-menu-item",
    templateUrl: "./menu-item.component.html",
    styleUrls: ["./menu-item.component.scss"]
})
export class MenuItemComponent {

    @Input("item")
    public item!: MenuItem;

}
