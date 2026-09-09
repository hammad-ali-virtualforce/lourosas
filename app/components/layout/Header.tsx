import { getSiteSettings } from "@/app/lib/wordpress/grapgql/site";
import { getMenus } from "@/app/lib/wordpress/grapgql/menu";

import HeaderClient from "./HeaderClient";

export default async function Header() {
  const [settings, menus] = await Promise.all([
    getSiteSettings(),
    getMenus(),
  ]);

  return (
    <HeaderClient
      branding={settings.branding}
      headerSettings={settings.header}
      headerMenu={menus.headerMenu}
      hamburgerMenu={menus.hamburgerMenu}
    />
  );
}