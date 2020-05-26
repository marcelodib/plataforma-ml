const items = [
    {route: "/createProject", icon: "fa-plus", title: "Criar Projeto"},
    {route: "/listProject", icon: "fa-list", title: "Listar Projeto"},
    {route: "/updatePassword", icon: "fa-key", title: "Mudar Senha"},
    {route: "/signOut", icon: "fa-sign-out-alt", title: "Sign Out"}
]
/*============================================================================*/
/**
 * =======================================================
 * |Função responsável renderizar o titulo da side bar.  |
 * =======================================================
 */
function setSideBarTitle(title, icon) {
    /*Variável que contém o elemento da página sidebar-title.*/
    const sideBarTitle = document.getElementById("sidebar-title");
    /*Atribuição do título na side bar.*/
    sideBarTitle.innerHTML = `
        <h4><i class="fas ${icon} fa-1x"></i> ${title}</h4>
        <hr>`;
    
    setSideBarItems();
    return;
}
/*============================================================================*/

/*============================================================================*/
/**
 * =======================================================
 * |Função responsável renderizar o titulo da side bar.  |
 * =======================================================
 */
function setSideBarItems() {
    /*Variável de manipulação do elemento de tela sidebar-menu.*/
    const sideBar = document.getElementById("sidebar-menu");
    sideBar.innerHTML = '';

    /**
     * Loop para redenderizar todos os itens da
     * side bar disponiveis para o usuario.
     */
    items.forEach(element => {
        sideBar.innerHTML += templateSideBarItem(element);
    });        
    return;
}
/*============================================================================*/

/*============================================================================*/
/**
 * =======================================================
 * |Função responsável por retornar um template html de  |
 * |um determinado item do side bar menu, correspondente |
 * |a uma permissão do usuário.                          |
 * =======================================================
 */
function templateSideBarItem(element) {
    return `
        <li>
            <a href="${element.route}"><i class="fas ${element.icon} fa-1x"></i> ${element.title}</a>
        </li>
    `;
}
/*============================================================================*/