import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { UsersService } from "src/app/core/services";
import { User } from "src/app/core/types";

@Component({
    selector: "app-user-list",
    templateUrl: "./user-list.component.html",
    styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {

    public users: User[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private usrService: UsersService
    ) { }

    public ngOnInit(): void {
        const page = 1;
        const rpp = 15;
        this.usrService.list(page, rpp, {}).subscribe((res) => {
            const length = this.users.length;
            this.users.splice(0, length, ...res);
        });
    }

    public onOpen(row: User): void {
        this.router.navigate([row.id], { relativeTo: this.route });
    }

}
