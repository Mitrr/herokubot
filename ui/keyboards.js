module.exports.menus = {
    'auth':{
        disable_web_page_preview: false,
        reply_markup:JSON.stringify ({
            inline_keyboard: [
                [{
                    text:'Авторизоваться',
                    callback_data: 'auth'
                }],
                [{
                    text:'Закрыть',
                    callback_data: 'closeAuth'
                }],
            ],
            one_time_keyboard: true
        })
    },
    'managersMenu':{
        disable_web_page_preview: false,
        reply_markup:JSON.stringify ({
            inline_keyboard: [
                [{
                    text:'СПИСОК КЛИЕНТОВ ЗА МЕСЯЦ',
                    callback_data: 'client-list-per-month'
                }],
                [{
                    text:'ДОБАВИТЬ КЛИЕНТА',
                    callback_data: 'add-client'
                }],
                [{
                    text:'ПОЛУЧИТЬ INFO КЛИЕНТА ПО НОМЕРУ ТЕЛЕФОНА',
                    callback_data: 'find-client-by-phone-number'
                }],
            ],
            one_time_keyboard: true
        })
    }
};