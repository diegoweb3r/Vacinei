    renderNavbar()


    const dropdownButton = document.getElementById("dropdown-button");
    const dropdownMenu = document.querySelector(".dropdown-menu");


    if (dropdownButton) {
    dropdownButton.addEventListener("click", (e) => {
        e.preventDefault();
        toggleDropdownMenu();
    });
    }


    function renderNavbar() {
    const navbar = document.getElementById("navbar");

    if (!navbar) return;
    const loggedUser = DB.getLogged();

        if(!usuarioLogado){
            alert("Usuario nao esta logado")
                navbar.innerHTML = `
                <div class="navbar__logo-container">
                            <img src="./assets/images/vacinei-logo.png" alt="logo vacinei" class="navbar__logo-image">
                            <p class="navbar__logo-text">Vacinei</p>
                        </div>
                        <div class="mobile-menu">
                            <button id="menu-toggle-button" aria-expanded="false"><img id="menu-toggle-button-image"class="mobile-menu__img" src="./assets/images/cardapio.png" alt="ícone de 3 traços para menu"></button>
                        </div>
                        <nav  id="navbar__links-container" class="navbar__links-container">
                            <ul id="navbar-links" class="navbar-links">
                                <li><a href="index.html">Home</a></li>
                                <li><a href="#features">Funcionalidades</a></li>
                                <li><a href="./pages/login.html" class="nav-link-login">Entrar</a></li>
                                <li><a href="./pages/cadastro.html" class="bttn">Cadastrar</a></li>
                            </ul>
                        </nav>
                    `;
        }

        if(usuarioLogado){
            alert("Usuario esta logado")
            const userPicture = loggedUser.userPhoto || "../assets/images/pessoas.png";
            navbar.innerHTML = `
                <div class="navbar__logo-container">
                    <img src="../assets/images/vacinei-logo.png" alt="logo vacinei" class="navbar__logo-image">
                    <p class="navbar__logo-text">Vacinei</p>
                </div>
                <div class="mobile-menu">
                    <button id="menu-toggle-button" aria-expanded="false"><img id="menu-toggle-button-image"class="mobile-menu__img" src="../assets/images/cardapio.png" alt="ícone de 3 traços para menu"></button>
                </div>
                <nav id="navbar__links-container" class="navbar__links-container">
                    <ul class="navbar-links">
                        <li><a href="../index.html">Home</a></li>
                        <li><a href="../index.html#features">Funcionalidades</a></li>
                        <li><button id="dropdown-button" aria-expanded="false"><img class="section-image" src="${userPicture}" alt="Ícone de usuário"></button>
                            <ul  class="dropdown-menu">
                                <li><a href="./dashboard.html">Dashboard</a></li>
                                <li><a href="./configuracoes.html">Configurações</a></li>
                                <li><a id="logout-button-link">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>`;

        }
    }

    function toggleDropdownMenu() {
    dropdownMenu.classList.toggle("is-open");
    }