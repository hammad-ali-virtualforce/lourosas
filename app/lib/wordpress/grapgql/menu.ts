import { graphqlRequest } from "./graphql";

export type MenuItem = {
  id: string;
  databaseId: number;
  label: string;
  url: string;
  path: string;
  parentId: string | null;
  order: number;
};

type MenuConnection = {
  nodes: MenuItem[];
};

type MenusResponse = {
  headerMenu: MenuConnection;
  hamburgerMenu: MenuConnection;
};

export async function getMenus() {
  const query = `
    query GetMenus {
      headerMenu: menuItems(
        where: { location: HEADER_MENU }
        first:100
      ) {
        nodes {
          id
          databaseId
          label
          url
          path
          parentId
          order
        }
      }

      hamburgerMenu: menuItems(
        where: { location: HAMBURGER_MENU }
        first:100
      ) {
        nodes {
          id
          databaseId
          label
          url
          path
          parentId
          order
        }
      }
    }
  `;

  const data = await graphqlRequest<MenusResponse>({
    query,
    revalidate: 3600,
  });

  return {
    headerMenu: data.headerMenu.nodes,
    hamburgerMenu: data.hamburgerMenu.nodes,
  };
}