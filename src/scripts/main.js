/**
 * Script principal da DevSolutions
 * Este arquivo inicializa os componentes e funcionalidades gerais do site
 */
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização de todos os tooltips do Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Inicialização de todos os popovers do Bootstrap
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // Habilitar scrollspy do Bootstrap para destacar itens de navegação ativos
    const scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#navbar',
        offset: 100
    });
    
    // Função para animar os elementos à medida que eles aparecem na viewport
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }
    
    // Adicionar a classe 'animate-on-scroll' aos elementos que deseja animar
    const elementsToAnimate = document.querySelectorAll('.section-title, .card, .lead');
    elementsToAnimate.forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    // Executar animação no carregamento e no scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executar uma vez no carregamento
    
    // Código para garantir que o menu de navegação permaneça visível em dispositivos móveis
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
    
    // Código para mostrar ou esconder o botão "voltar ao topo"
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.classList.add('back-to-top');
    backToTopButton.setAttribute('aria-label', 'Voltar ao topo');
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary);
        color: white;
        border: none;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    document.body.appendChild(backToTopButton);
    
    // Mostrar ou esconder o botão com base na posição do scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.transform = 'translateY(0)';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.transform = 'translateY(20px)';
        }
    });
    
    // Adicionar funcionalidade de volta ao topo
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Verificar se há hash na URL para rolagem automática
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            setTimeout(function() {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 300);
        }
    }
});