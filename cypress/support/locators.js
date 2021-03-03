const locators = {
    LOGIN: {
        USER:'.input-group > .form-control',
        PASSWORD:':nth-child(2) > .form-control',
        BTN_LOGIN:'.btn'
    },
    MENU:{
        SETTINGS: '.dropdown-toggle',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]'

    },
    CONTAS:{
        NOME_CONTA:'.form-control',
        BTN_SALVAR:'.btn',
        LIST:'tbody > tr > :nth-child(1)',
        XP_BTN_ALTERAR:"//table//td[contains(.,'Conta x')]/..//i[@class='far fa-edit']"
    },
    MESSAGE: '.toast-message'
}

export default locators;