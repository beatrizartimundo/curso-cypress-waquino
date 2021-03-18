const locators = {
    LOGIN: {
        USER:'.input-group > .form-control',
        PASSWORD:':nth-child(2) > .form-control',
        BTN_LOGIN:'.btn'
    },
    MENU:{
        HOME: '[data-test=menu-home]',
        SETTINGS: '.dropdown-toggle',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO:'[data-test=menu-movimentacao]',
        EXTRATO: '[data-test=menu-extrato]'

    },
    CONTAS:{
        NOME_CONTA:'.form-control',
        BTN_SALVAR:'.btn',
        LIST:'tbody > tr > :nth-child(1)',
        FN_XP_BTN_ALTERAR:nome =>`//table//td[contains(.,'${nome}')]/..//i[@class='far fa-edit']`
        
    },
    MOVIMENTACAO:{
        DESCRICAO: '[data-test=descricao]',
        VALOR:'[data-test=valor]',
        ENVOLVIDO: '[data-test=envolvido]',
        TIPO_CONTA:'[data-test=conta]',
        STATUS:'[data-test=status]',
        BTN_SALVAR:'.btn-primary'

    },
    EXTRATO:{
        LINHAS:'.list-group > li',
        FN_XP_BUSCA:(desc,value) => `//span[contains(., '${desc}')]/following-sibling::small[contains(., '${value}')]`,
        FN_XP_REMOVE: desc => `//span[contains(., '${desc}')]/../../..//i[@class='far fa-trash-alt']`,
        FN_XP_EDIT: desc => `//span[contains(., '${desc}')]/../../..//i[@class='fas fa-edit']`,
        FN_XP_LINHA: desc => `//span[contains(., '${desc}')]/../../../..`
},
    SALDO:{
        FN_XP_SALDO: nome => `//td[contains(., '${nome}')]/../td[2]`
    },
    MESSAGE: '.toast-message'
}

export default locators;