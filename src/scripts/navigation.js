/**
 * Script para navegação suave entre as seções da página
 */
document.addEventListener('DOMContentLoaded', function() {
    // Selecionando todos os links da navegação
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Adicionando evento de clique em cada link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevenindo o comportamento padrão do link
            e.preventDefault();
            
            // Obtendo o alvo da seção através do atributo href
            const targetId = this.getAttribute('href');
            
            // Verificando se o alvo é uma âncora
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                
                // Se a seção alvo existir, role até ela
                if (targetSection) {
                    // Calcular a posição da seção considerando o header fixo
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    // Rolagem suave para a seção
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Fechar o menu hamburger se estiver aberto em dispositivos móveis
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });
    
    // Adicionar classe ativa ao link da seção visível
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const headerHeight = document.querySelector('header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 10;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remover classe ativa de todos os links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Adicionar classe ativa ao link correspondente
                const id = section.getAttribute('id');
                if (id) {
                    const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            }
        });
        
        // Se estiver no topo da página, ativar o link Home
        if (window.scrollY < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            const homeLink = document.querySelector('.navbar-nav .nav-link[href="#home"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
    }
    
    // Alterar estilo da navbar ao rolar a página
    function handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 50) {
            navbar.classList.add('bg-primary', 'shadow');
            navbar.classList.remove('navbar-dark');
            navbar.classList.add('navbar-dark');
        } else {
            navbar.classList.add('navbar-dark');
            navbar.classList.remove('shadow');
        }
    }
    
    // Adicionar eventos de scroll
    window.addEventListener('scroll', setActiveNavLink);
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Executar as funções no carregamento da página
    setActiveNavLink();
    handleNavbarScroll();
    
    // Ajustar navegação para links no footer
    const footerLinks = document.querySelectorAll('footer a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});