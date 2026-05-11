export interface MenuBase {
    label: string;
    icon: string;
}

export interface MenuLink extends MenuBase {
    route: string;
}

export interface MenuAction extends MenuBase {
    destructive: boolean;
    action: () => void;
}

export interface MenuSeparator {
    separator: boolean;
}

export type MenuRoute = MenuLink | MenuSeparator | MenuAction;

export const routes: MenuRoute[] = [
    { label: 'Dashboard', icon: 'dashboard', route: 'dashboard' },
    { separator: true },
    {  label: 'Logout', icon: 'logout', destructive: true, action: () => console.log('Logout') },
]
