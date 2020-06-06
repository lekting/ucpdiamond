if(typeof jQuery != 'undefined') {
    var app = {
        restore_nicknames: function () {
            var nlist = $('#nicknames_list'), server = this.get_server(), mailorphone = $('#user-email-phone').val(), cresponse = grecaptcha.getResponse(), obj;
            nlist.empty().append('<p>Результаты поиска:</p>');
            $.post('/restore/nicknames/', {
                server: '' + server + '',
                mailorphone: '' + mailorphone + '',
                grecaptcharesponse: '' + cresponse + ''
            })
                .done(function (data) {
                    if (data == 'incorrect_server') {
                        app.html_message(data, 3);
                    } else if (data == 'incorrect_mail_and_phone') {
                        app.html_message(data, 3);
                    } else if (data == 'empty_result') {
                        $('.view-nickname').addClass('animated fadeIn on');
                        nlist.append('<p><strong>Ничего не найдено</strong></p>');
                    } else if (data == 'invalid_captcha') {
                        app.html_message(data, 3);
                    } else {
                        $('#user-email-phone').val(null);
                        obj = $.parseJSON(data);
                        $('.view-nickname').addClass('animated fadeIn on');
                        $.each(obj, function (index, value) {
                            nlist.append('<p><strong>' + value['nickname'] + '</strong></p>');
                        });
                    }
                    grecaptcha.reset();
                });
        },

        restore_password: function (method) {
            if(method == 'email' || method == 'phone') {
                var server = this.get_server(), email = $('#user-email').val(), phone = $('#user-phone').val(), nickname = $('#user-nickname').val(), cresponse = grecaptcha.getResponse();
                $.post('/restore/password/', {
                    method: '' + method + '',
                    server: '' + server + '',
                    nickname: '' + nickname + '',
                    email: '' + email + '',
                    phone: '' + phone + '',
                    grecaptcharesponse: '' + cresponse + ''
                })
                    .done(function (data) {
                        if (data == 'incorrect_server') {
                            app.html_message(data, 2);
                        } else if (data == 'incorrect_nickname') {
                            app.html_message(data, 2);
                        } else if (data == 'account_no_exists_with_mail') {
                            app.html_message(data, 2);
                        } else if (data == 'account_no_exists_with_phone') {
                            app.html_message(data, 2);
                        } else if (data == 'incorrect_email') {
                            app.html_message(data, 2);
                        } else if (data == 'incorrect_phone') {
                            app.html_message(data, 2);
                        } else if (data == 'password_update_error') {
                            app.html_message(data, 2);
                        } else if (data == 'invalid_captcha') {
                            grecaptcha.reset();
                            app.html_message(data, 2);
                        } else if (data == 'password_was_reset') {
                            app.html_message(data, 2);
                        } else if (data == 'password_updated') {
                            $('#user-email, #user-phone, #user-nickname').val(null);
                            $('#newpasssuccess').modal('show');
                        }
                        grecaptcha.reset();
                    });
            }
        },

        login_user: function () {
            var server = this.get_server(), nickname = $('#user-nickname').val(), password = $('#user-password').val(),
                code = $('#user-code').val();
                //cresponse = grecaptcha.getResponse();
            $.post('/cabinet/login/', {
                server: '' + server + '',
                nickname: '' + nickname + '',
                password: '' + password + '',
                code: '' + code + '',
                //grecaptcharesponse: '' + cresponse + ''
            })
                .done(function (data) {
                    if (data == 'incorrect_server') {
                        app.html_message(data, 1);
                    } else if (data == 'incorrect_nickname') {
                        app.html_message(data, 1);
                    } else if (data == 'invalid_nickname') {
                        app.html_message(data, 1);
                    } else if (data == 'incorrect_password') {
                        app.html_message(data, 1);
                    } else if (data == 'invalid_password') {
                        app.html_message(data, 1);
                    } else if (data == 'incorrect_code') {
                        app.html_message(data, 1);
                    } else if (data == 'invalid_code') {
                        app.html_message(data, 1);
                    } else if (data == 'invalid_captcha') {
                        app.html_message(data, 1);
                    } else if (data == 'error_session_init') {
                        app.html_message(data, 1);
                    } else if (data == 'user_authorized') {
                        app.html_message(data, 1);
                    } else if (data == 'success_login') {
                        $('#user-email, #user-nickname, #user-code').val(null);
                        window.location = '/cabinet';
                    } else if (data == 'success_login_cgc') {
                        $('#user-email, #user-nickname, #user-code').val(null);
                        $('#googlecode').modal('show');
                    }
                    //grecaptcha.reset();
                });
        },

        webgaon_checkcode: function () {
            var code = $('#gauth_code').val();
            if (!code) {
                app.html_message('err_no_code', 4);
            } else {
                $.post('/protection/checkonetimecode/', {
                    token: '' + code + ''
                })
                    .done(function (data) {
                        if (data == 'empty_user') {
                            app.html_message(data, 4);
                        } else if (data == 'empty_code') {
                            app.html_message(data, 4);
                        } else if (data == 'inv_code') {
                            app.html_message(data, 4);
                        } else if (data == 'err_key') {
                            app.html_message(data, 4);
                        } else if (data == 'code_fail') {
                            app.html_message(data, 4);
                        } else if (data == 'code_is_old') {
                            app.html_message(data, 4);
                        } else if (data == 'code_ok') {
                            window.location = '/cabinet';
                        }
                    });
            }
        },

        activate_protection: function () {
            var code = $('#gauth_code').val();
            if (!code) {
                app.html_message('err_no_code', 6);
            } else {
                $.post('/protection/activate/', {
                    token: '' + code + ''
                })
                    .done(function (data) {
                        if (data == 'empty_token') {
                            app.html_message(data, 6);
                        } else if (data == 'invalid_token') {
                            app.html_message(data, 6);
                        } else if (data == 'err_keygen') {
                            app.html_message(data, 6);
                        } else if (data == 'dbupderror') {
                            app.html_message(data, 6);
                        } else if (data == 'codeisold') {
                            app.html_message(data, 6);
                        } else if (data == 'codefail') {
                            app.html_message(data, 6);
                        } else if (data == 'activation_success') {
                            window.location = '/protection/activated';
                        }
                    });
            }
        },

        get_online_players_exec: false,
        init_online_players: function() {
            var device_type = this.get_device_type();
            if(device_type == 'desktop') {
                $('input[id=emerald]').prop('checked', true);
            } else {
                $('select[name=enterserver]').val('server');
            }
            $('.gamers-list li:first').addClass('active');
            app.get_online_players('all');
        },

        update_tab_by_server: function() {
            var tab = $('.gamers-list li.active a').attr("data-tab");
            app.get_online_players(tab);
        },

        get_online_players: function(tab) {
            var server = this.get_server(), nlist = $('#sel_' + tab + '_players'), obj, asc = $('input[name=asc]').val();
            if(app.get_online_players_exec == true) {
                nlist.html('<center>Пожалуйста, не так быстро!<br>Повторите попытку через несколько секунд.</center>');
                return;
            } else {
                app.get_online_players_exec = true;
            }
            nlist.html('<div style="text-align:center;margin-top:46px;"><img src="/images/loader.gif"></div>');
            if(tab) {
                setTimeout(function () {
                    $.post('/players/online/', {
                        server: '' + server + '',
                        tab: '' + tab + '',
                        asc: '' + asc + ''
                    })
                        .done(function (data) {
                            nlist.empty();
                            if(data != 'false') {
                                obj = $.parseJSON(data);
                                $.each(obj, function (index, value) {
                                    (value['phone'] == '0') ? value['phone'] = 'отсутствует' : value['phone'];
                                    nlist.append('<tr><td>' + value['nickname'] + '</td><td><img src="/images/ico_phone.png"> ' + value['phone'] + '</td><td>' + value['fraction'] + '</td></tr>');
                                });
                            } else {
                                nlist.append('<center>Игроков по запросу не найдено.</center>');
                            }
                            app.get_online_players_exec = false;
                        });
                }, 1200);
            }
        },

        donate_init: function () {
            var server = this.get_server(), nickname = $('#user-nickname').val(), summ = $('#user-summ').val(), email = $('#user-email').val(), json;
            $.post('/donate/', {
                server: '' + server + '',
                nickname: '' + nickname + '',
                summ: '' + summ + '',
                email: '' + email + ''
            })
                .done(function (data) {
                    json = $.parseJSON(data);
                    if(json['redirect_url'] == null) {
                        if(json['message'] == 'incorrect_server') {
                            app.html_message(json['message'], 5);
                        } else if (json['message'] == 'incorrect_nickname') {
                            app.html_message(json['message'], 5);
                        } else if (json['message'] == 'empty_summ') {
                            app.html_message(json['message'], 5);
                        } else if (json['message'] == 'incorrect_email') {
                            app.html_message(json['message'], 5);
                        } else if (json['message'] == 'empty_summ') {
                            app.html_message(json['message'], 5);
                        } else if (json['message'] == 'account_no_exists') {
                            app.html_message(json['message'], 5);
                        }
                    } else if(json['redirect_url'] != null && json['message'] == 'payment_init_success') {
                        app.html_message(json['message'], 5);
                        window.location = json['redirect_url'];
                        $(location).attr("href", json['redirect_url']);
                    }
                });
        },

        roulette_exec: 0,
        roulette_start: function () {
            var json, device_type = this.get_device_type();
            if(app.roulette_exec == 1) {
                return;
            }
            if(device_type == 'mobile') {
                alert('Устройство не поддерживается.');
                return;
            }
            //setTimeout(function() { if(app.roulette_exec != 1) { window.location = "/roulette/win"; } }, 20000);
            $.post('/roulette/response/', {
                play: 'true'
            })
                .done(function (data) {
                    json = $.parseJSON(data);
                    if (json['error_message'] == 'time_error') {
                        app.html_message(json['error_message'], 7);
                    } else if (json['error_message'] == 'browser_error') {
                        app.html_message(json['error_message'], 7);
                    } else if (json['error_message'] == 'access_error') {
                        app.html_message(json['error_message'], 7);
                    } else if (json['error_message'] == 'db_error') {
                        app.html_message(json['error_message'], 7);
                    } else if (json['error_message'] == 'already_started') {
                        app.html_message(json['error_message'], 7);
                    } else if (json['error_message'] == 'balance_error') {
                        //Хотите 1 раз бесплатно сыграть в рулетку сегодня?<br>Для этого отыграйте ещё <b>"+ws+"</b> минут(ы) на сервере.
                        if(json['user_level'] >= 10 && json['frp'] == 0 && json['paydays'] < 10800)
                        {
                            $('.failroulette').empty().append('<p><strong>Ошибка!</strong><br>Недостаточно средств для запуска рулетки!<br>Стоимость запуска рулетки: 49 рублей.<br>Пополнить счет можно на <a href=\'/donate\' target=\'/_blank\'>странице доната</a>.<br><br>Хотите 1 раз сыграть бесплатно в рулетку сегодня?<br>Для этого отыграйте ещё <b>'+(180-Math.floor(json['paydays']/60))+'</b> минут(ы) на сервере.</p>');
                            $('.failroulette').slideDown('fast');
                        } else {
                            app.html_message(json['error_message'], 7);
                        }
                    } else if (json['error_message'] == 'online_error') {
                        app.html_message(json['error_message'], 7);
                    } else {
                        app.roulette_exec = 1;
                        if(json['freegame'] == 1) {
                            app.html_message('freegame', 7);
                        }
                        if(json['freegame'] != 1) {
                            $('.your-cash span').html($('.your-cash span').text()-49);
                        }
                        var w = json['w'];
                        $("#"+w).attr("win", "1");
                        var mCur = $("#r_"+w).html();
                        $("#carusel").find("#r_"+w).remove();
                        $("#carusel").shuffle();
                        $("#carusel").find("li").eq($("#carusel > li").length - 5).replaceWith(mCur);
                        $('.failroulette').slideUp('fast');
                        $('a').each(function() {
                            $(this).attr("target", "_blank");
                        });
                        runRoulette();
                    }
                });
        },
        maxdays: 0,
        property_showpayment: function(type) {
            if(type) {
                if (!$('.pay-list li a').hasClass('openinger')) {
                    $('.' + type).addClass('openinger');
                    var a = $('.' + type).find('.loading.whitebox');
                    a.fadeIn();

                    $.post('/property/getdata', {
                        property_type: '' + type + ''
                    })
                        .done(function (data) {
                            a.fadeOut();
                            $('.pay-list li a').removeClass('openinger');
                            json = $.parseJSON(data);
                            if(json['error_message'] == 'user_banned') {
                                app.html_message(json['error_message'], 8);
                                return;
                            }
                            if(type == 'house') {
                                if (json['error_message'] == 'incorrect_type') {
                                    alert('Некорректный тип имущества!');
                                } else if (json['error_message'] == 'empty_result') {
                                    app.html_message('house_empty_result', 8);
                                } else {
                                    if(json['data']['day'] >= 30) {
                                        app.html_message('house_max_days', 8);
                                    } else {
                                        $('#property-name-desc').html('Оплата дома<br><small>Дом №' + json['data']['id'] + '</small>');
                                        app.maxdays = (30-(json['data']['day']));
                                        $('#property-days-desc').html('Осталось дней до выселения: '+json['data']['day']+'<br>Укажите количество дней для оплаты:<br>от 1 до ' + app.maxdays + '');
                                        $('#a-property-pay').attr('onclick', 'app.property_pay(\'house\', $(\'.sizer\').html())');
                                        $('#pay-property').modal('show');
                                    }
                                }
                            } else if(type == 'business') {
                                if (json['error_message'] == 'incorrect_type') {
                                    alert('Некорректный тип имущества!');
                                } else if (json['error_message'] == 'empty_result') {
                                    app.html_message('business_empty_result', 8);
                                } else {
                                    if(json['data']['day'] >= 30) {
                                        app.html_message('business_max_days', 8);
                                    } else {
                                        $('#property-name-desc').html('Оплата бизнеса<br><small>' + json['data']['name'] + '</small>');
                                        app.maxdays = (30-(json['data']['day']));
                                        $('#property-days-desc').html('Осталось дней до продажи государству: '+json['data']['day']+'<br>Укажите количество дней для оплаты:<br>от 1 до ' + app.maxdays + '');
                                        $('#a-property-pay').attr('onclick', 'app.property_pay(\'business\', $(\'.sizer\').html())');
                                        $('#pay-property').modal('show');
                                    }
                                }
                            } else if(type == 'hotel') {
                                if (json['error_message'] == 'incorrect_type') {
                                    alert('Некорректный тип имущества!');
                                } else if (json['error_message'] == 'empty_result') {
                                    app.html_message('hotel_empty_result', 8);
                                } else {
                                    if(json['data']['day'] >= 30) {
                                        app.html_message('hotel_max_days', 8);
                                    } else {
                                        $('#property-name-desc').html('Оплата отеля<br><small>Отель №' + json['data']['id'] + '</small>');
                                        app.maxdays = (30-(json['data']['day']));
                                        $('#property-days-desc').html('Осталось дней до продажи государству: '+json['data']['day']+'<br>Укажите количество дней для оплаты:<br>от 1 до ' + app.maxdays + '');
                                        $('#a-property-pay').attr('onclick', 'app.property_pay(\'hotel\', $(\'.sizer\').html())');
                                        $('#pay-property').modal('show');
                                    }
                                }
                            }
                        });
                    return false;
                }
            }
        },
        property_payed_days: 0,
        property_pay: function (type, days) {
            if(type && days) {
                if (!$('.loading-inpage').hasClass('block')) {
                    $('.loading-inpage').addClass('block');
                    $.post('/property/pay', {
                        property_type: '' + type + '',
                        newdays: '' + days + ''
                    })
                        .done(function (data) {
                            $('.loading-inpage').removeClass('block');
                            json = $.parseJSON(data);
                            if (json['error_message'] == 'empty_property') {
                                app.html_message(json['error_message'], 9);
                            } else if (json['error_message'] == 'much_days') {
                                app.html_message(json['error_message'], 9);
                            } else if (json['error_message'] == 'low_balance') {
                                app.html_message(json['error_message'], 9);
                            } else if (json['error_message'] == 'online_error') {
                                app.html_message(json['error_message'], 9);
                            } else if (json['error_message'] == 'incorrect_days') {
                                app.html_message(json['error_message'], 9);
                            } else {
                                app.property_payed_days = days;
                                if (json['result'] == 'house_payment_success') {
                                    app.html_message(json['result'], 9);
                                } else if (json['result'] == 'hotel_payment_success') {
                                    app.html_message(json['result'], 9);
                                } else if (json['result'] == 'business_payment_success') {
                                    app.html_message(json['result'], 9);
                                }
                                setTimeout(function () {
                                    $('.sizer').html('1');
                                }, 500);
                            }
                        });
                }
            }
        },

        html_message: function (message, mtype) {
            if (message !== undefined && mtype !== undefined) {
                if (mtype == 1) {
                    switch (message) {
                        case 'incorrect_server':
                            $('.loginwarn.serverwarn').fadeIn();
                            setTimeout(function () {
                                $('.loginwarn.serverwarn').fadeOut()
                            }, 2000);
                            break;
                        case 'incorrect_nickname':
                            $('.loginwarn.nickwarn').empty().append('<p><strong>Ошибка</strong></p><p>Указан недопустимый ник.</p>').fadeIn();
                            setTimeout(function () {
                                $('.loginwarn.nickwarn').fadeOut()
                            }, 2000);
                            break;
                        case 'invalid_nickname':
                            $('.loginwarn.nickwarn').empty().append('<p><strong>Ошибка</strong></p><p>Аккаунт не существует на сервере.</p>').fadeIn();
                            setTimeout(function () {
                                $('.loginwarn.nickwarn').fadeOut()
                            }, 2000);
                            break;
                        case 'incorrect_password':
                            $('.loginwarn.passwarn').empty().append('<p><strong>Ошибка</strong></p><p>Указан недопустимый пароль.</p>').fadeIn();
                            setTimeout(function () {
                                $('.loginwarn.passwarn').fadeOut()
                            }, 2000);
                            break;
                        case 'invalid_password':
                            $('.loginwarn.passwarn').empty().append('<p><strong>Ошибка</strong></p><p>Неверный пароль от аккаунта.</p>').fadeIn();
                            setTimeout(function () {
                                $('.loginwarn.passwarn').fadeOut()
                            }, 2000);
                            break;
                        case 'incorrect_code':
                            $('.loginwarn.secretwarn').empty().append('<p><strong>Ошибка</strong></p><p>Указан недопустимый защитный код.</p>').fadeIn();
                            setTimeout(function () {
                                $('.loginwarn.secretwarn').fadeOut()
                            }, 2000);
                            break;
                        case 'invalid_code':
                            $('.loginwarn.secretwarn').empty().append('<p><strong>Ошибка</strong></p><p>Неверный защитный код от аккаунта.</p>').fadeIn();
                            setTimeout(function () {
                                $('.loginwarn.secretwarn').fadeOut()
                            }, 2000);
                            break;
                        case 'invalid_captcha':
                            $('.loginwarn.googlewarn').empty().append('<p><strong>Ошибка</strong></p><p>Пройдите проверку каптчи.</p>').fadeIn();
                            setTimeout(function () {
                                $('.loginwarn.googlewarn').fadeOut()
                            }, 2000);
                            break;
                        case 'error_session_init':
                            $('#userauth_response_error').empty().append('<p><strong>Ошибка</strong></p><p>Сессия уже инициализирована.</p>');
                            $('.view-error-userauth').addClass('animated fadeIn on');
                            break;
                        case 'user_authorized':
                            $('#userauth_response_error').empty().append('<p><strong>Ошибка</strong></p><p>Вы уже авторизованы.<br><br><a href="/cabinet">Личный кабинет</a></p>');
                            $('.view-error-userauth').addClass('animated fadeIn on');
                            break;
                        case 'success_login':
                            setTimeout(function () {
                                $('#googlecode').modal('show');
                            }, 500);
                            break;
                    }
                }
                else if (mtype == 2) {
                    switch (message) {
                        case 'incorrect_server':
                            $('.loginwarn.serverwarn').fadeIn();
                            setTimeout(function () {
                                $('.loginwarn.serverwarn').fadeOut()
                            }, 2000);
                            break;
                        case 'incorrect_nickname':
                            $('.loginwarn.nickwarn').fadeIn();
                            setTimeout(function () {
                                $('.loginwarn.nickwarn').fadeOut()
                            }, 2000);
                            break;
                        case 'incorrect_email':
                            $('.loginwarn.mailwarn').fadeIn();
                            setTimeout(function () {
                                $('.loginwarn.mailwarn').fadeOut()
                            }, 2000);
                            break;
                        case 'incorrect_phone':
                            $('.loginwarn.mailwarn').fadeIn();
                            setTimeout(function () {
                                $('.loginwarn.mailwarn').fadeOut()
                            }, 2000);
                            break;
                        case 'invalid_captcha':
                            $('.loginwarn.googlewarn').fadeIn();
                            setTimeout(function () {
                                $('.loginwarn.googlewarn').fadeOut()
                            }, 2000);
                            break;
                        case 'password_update_error':
                            $('#resetpw_response_error').empty().append('<p><strong>Ошибка</strong></p><p>Не удалось обновить пароль(ошибка БД).</p>');
                            $('.view-error-resetpw').addClass('animated fadeIn on');
                            break;
                        case 'account_no_exists_with_mail':
                            $('#resetpw_response_error').empty().append('<p><strong>Ошибка</strong></p><p>Не удалось найти аккаунт с указанным вами ником и e-mail адресом!</p>');
                            $('.view-error-resetpw').addClass('animated fadeIn on');
                            break;
                        case 'account_no_exists_with_phone':
                            $('#resetpw_response_error').empty().append('<p><strong>Ошибка</strong></p><p>Не удалось найти аккаунт с указанным вами ником и номером телефона!</p>');
                            $('.view-error-resetpw').addClass('animated fadeIn on');
                            break;
                        case 'password_was_reset':
                            $('#resetpw_response_error').empty().append('<p><strong>Ошибка</strong></p><p>Пароль уже был восстановлен!</p>');
                            $('.view-error-resetpw').addClass('animated fadeIn on');
                            break;
                    }
                }
                else if (mtype == 3) {
                    switch (message) {
                        case 'incorrect_server':
                            $('.loginwarn.serverwarn').fadeIn();
                            setTimeout(function () {
                                $('.loginwarn.serverwarn').fadeOut()
                            }, 2000);
                            break;
                        case 'incorrect_mail_and_phone':
                            $('.loginwarn.mailwarn').fadeIn();
                            setTimeout(function () {
                                $('.loginwarn.mailwarn').fadeOut()
                            }, 2000);
                            break;
                        case 'invalid_captcha':
                            $('.loginwarn.googlewarn').fadeIn();
                            setTimeout(function () {
                                $('.loginwarn.googlewarn').fadeOut()
                            }, 2000);
                            break;
                    }
                }
                else if (mtype == 4) {
                    switch (message) {
                        case 'empty_user':
                            $('#gauth_error_message').empty().append('<p><strong>Ошибка</strong><br>Не удалось идентифицировать ваш аккаунт.<br>Пожалуйста, авторизуйтесь заново.</p>');
                            $('.googleauthform-warn').slideDown();
                            setTimeout(function () {
                                $('.googleauthform-warn').slideUp()
                            }, 4000);
                            break;
                        case 'err_no_code':
                            $('#gauth_error_message').empty().append('<p><strong>Ошибка</strong><br>Пожалуйста, укажите одноразовый код из приложения!</p>');
                            $('.googleauthform-warn').slideDown();
                            setTimeout(function () {
                                $('.googleauthform-warn').slideUp()
                            }, 3000);
                            break;
                        case 'empty_code':
                            $('#gauth_error_message').empty().append('<p><strong>Ошибка</strong><br>Пожалуйста, укажите одноразовый код из приложения!</p>');
                            $('.googleauthform-warn').slideDown();
                            setTimeout(function () {
                                $('.googleauthform-warn').slideUp()
                            }, 3000);
                            break;
                        case 'inv_code':
                            $('#gauth_error_message').empty().append('<p><strong>Ошибка</strong><br>Указанный вами код содержит запрещенные символы!</p>');
                            $('.googleauthform-warn').slideDown();
                            setTimeout(function () {
                                $('.googleauthform-warn').slideUp()
                            }, 3000);
                            break;
                        case 'err_key':
                            $('#gauth_error_message').empty().append('<p><strong>Ошибка</strong><br>Не определен ключ для вашего аккаунта!</p>');
                            $('.googleauthform-warn').slideDown();
                            setTimeout(function () {
                                $('.googleauthform-warn').slideUp()
                            }, 3000);
                            break;
                        case 'code_fail':
                            $('#gauth_error_message').empty().append('<p><strong>Ошибка</strong><br>Указанный одноразовый код из приложения неверный. Повторите попытку...</p>');
                            $('.googleauthform-warn').slideDown();
                            setTimeout(function () {
                                $('.googleauthform-warn').slideUp()
                            }, 3000);
                            break;
                        case 'code_is_old':
                            $('#gauth_error_message').empty().append('<p><strong>Ошибка</strong><br>Указанный одноразовый код некорректен или устарел.<br>Введите новый из приложения.</p>');
                            $('.googleauthform-warn').slideDown();
                            setTimeout(function () {
                                $('.googleauthform-warn').slideUp()
                            }, 4000);
                            break;
                        case 'code_ok':
                            window.location = '/cabinet';
                    }
                }
                else if (mtype == 5) {
                    switch (message) {
                        case 'incorrect_server':
                            $('.loginwarn.serverwarn').fadeIn();
                            setTimeout(function () {
                                $('.loginwarn.serverwarn').fadeOut()
                            }, 2000);
                            break;
                        case 'incorrect_nickname':
                            $('.loginwarn.nickwarn').empty().append('<p><strong>Ошибка</strong></p><p>Указан недопустимый ник.</p>').fadeIn();
                            setTimeout(function () {
                                $('.loginwarn.nickwarn').fadeOut()
                            }, 2000);
                            break;
                        case 'empty_summ':
                            $('.loginwarn.summwarn').empty().append('<p><strong>Ошибка</strong></p><p>Укажите сумму в рублях!</p>').fadeIn();
                            setTimeout(function () {
                                $('.loginwarn.summwarn').fadeOut()
                            }, 2000);
                            break;
                        case 'incorrect_email':
                            $('.loginwarn.secretwarn').empty().append('<p><strong>Ошибка</strong></p><p>Указан недопустимый e-mail.</p>').fadeIn();
                            setTimeout(function () {
                                $('.loginwarn.secretwarn').fadeOut()
                            }, 2000);
                            break;
                        case 'account_no_exists':
                            $('#userauth_response_error').empty().append('<p><strong>Ошибка</strong></p><p>Аккаунт не существует на сервере!</p>');
                            $('.view-error-userauth').addClass('animated fadeIn on');
                            break;
                        case 'payment_init_success':
                            $('#payment_init_btn').hide();
                            $('#payment_init_loader').show().html("<center><img src='/images/loader_round.gif' width='96' height='96'></center>");
                            break;
                    }
                }
                else if(mtype == 6) {
                    switch (message) {
                        case 'err_no_code':
                            $('.loginwarn.googlefail').fadeIn();
                            setTimeout(function () {
                                $('.loginwarn.googlefail').fadeOut()
                            }, 2000);
                            break;
                        case 'empty_token':
                            $('.loginwarn.googlefail').fadeIn();
                            setTimeout(function () {
                                $('.loginwarn.googlefail').fadeOut()
                            }, 2000);
                            break;
                        case 'invalid_token':
                            $('#gauth_response_error').empty().append('<p><strong>Ошибка</strong></p><p>Указаны недопустимые символы в поле ввода кода из приложения!</p>');
                            $('.view-error-google').addClass('animated fadeIn on');
                            break;
                        case 'err_keygen':
                            $('#gauth_response_error').empty().append('<p><strong>Ошибка</strong></p><p>Не был сгенерирован QR ключ! Нажмите на изображение с QR кодом!</p>');
                            $('.view-error-google').addClass('animated fadeIn on');
                            break;
                        case 'dbupderror':
                            $('#gauth_response_error').empty().append('<p><strong>Ошибка</strong></p><p>Database Query Response Error!</p>');
                            $('.view-error-google').addClass('animated fadeIn on');
                            break;
                        case 'codeisold':
                            $('#gauth_response_error').empty().append('<p><strong>Ошибка</strong></p><p>Указанный одноразовый код некорректен или устарел.<br>Введите новый из приложения.</p>');
                            $('.view-error-google').addClass('animated fadeIn on');
                            break;
                        case 'codefail':
                            $('#gauth_response_error').empty().append('<p><strong>Ошибка</strong></p><p>Указанный одноразовый код неверный. Повторите попытку...</p>');
                            $('.view-error-google').addClass('animated fadeIn on');
                            break;
                    }
                }
                else if(mtype == 7) {
                    switch (message) {
                        case 'time_error':
                            $('.failroulette').empty().append('<p><strong>Ошибка!</strong><br>Рулетка недоступна, так как через пару минут будет рестарт сервера.<br>Повторите попытку через несколько минут.</p>');
                            $('.failroulette').slideDown('fast');
                            break;
                        case 'browser_error':
                            $('.failroulette').empty().append('<p><strong>Ошибка!</strong><br>Ваше устройство или браузер не поддерживает рулетку!</p>');
                            $('.failroulette').slideDown('fast');
                            break;
                        case 'access_error':
                            $('.failroulette').empty().append('<p><strong>Ошибка!</strong><br>Ошибка доступа!</p>');
                            $('.failroulette').slideDown('fast');
                            break;
                        case 'db_error':
                            $('.failroulette').empty().append('<p><strong>Ошибка!</strong><br>Не удалось определить базу данных.<br>Пожалуйста, перелогиньтесь.</p>');
                            $('.failroulette').slideDown('fast');
                            break;
                        case 'already_started':
                            $('.failroulette').empty().append('<p><strong>Ошибка!</strong><br>Рулетка уже запущена!<br>Повторите попытку через 10 секунд после запуска рулетки.</p>');
                            $('.failroulette').slideDown('fast');
                            break;
                        case 'balance_error':
                            $('.failroulette').empty().append('<p><strong>Ошибка!</strong><br>Недостаточно средств для запуска рулетки!<br>Стоимость запуска рулетки: 49 рублей.<br>Пополнить счет можно на <a href=\'/donate\' target=\'/_blank\'>странице доната</a>.</p>');
                            $('.failroulette').slideDown('fast');
                            break;
                        case 'online_error':
                            $('.failroulette').empty().append('<p><strong>Ошибка!</strong><br>Вы не должны быть на сервере во время игры в рулетку!</p>');
                            $('.failroulette').slideDown('fast');
                            break;
                        case 'freegame':
                            $('.freeroulette').empty().append('<p><strong>Этот запуск рулетки бесплатный для вас!</strong><br><br>Вы запустили рулетку бесплатно, так как соответствуете требованиям:<br><br>&nbsp- отыграно более 180 минут за сутки;<br>&nbsp;- персонаж 10 уровня или выше.</p>');
                            $('.freeroulette').slideDown('fast');
                            break;
                    }
                }
                else if(mtype == 8) {
                    switch (message) {
                        case 'user_banned':
                            $('#property_type_img').attr('src', '/images/user.svg');
                            $('.large-title').html('Ваш аккаунт забанен на сервере.<br>Невозможно оплатить имущество.');
                            $('#empty_property').modal('show');
                            break;
                        case 'house_empty_result':
                            $('#property_type_img').attr('src', '/images/ico-pay-home.svg');
                            $('.large-title').html('Вы не владеете личным домом<br>или квартирой.');
                            $('#empty_property').modal('show');
                            break;
                        case 'house_max_days':
                            $('#property_type_img').attr('src', '/images/ico-pay-home.svg');
                            $('.large-title').html('Ваш дом не нуждается в оплате.');
                            $('#empty_property').modal('show');
                            break;
                        case 'business_empty_result':
                            $('#property_type_img').attr('src', '/images/ico-pay-business.svg');
                            $('.large-title').html('Вы не владеете бизнесом.');
                            $('#empty_property').modal('show');
                            break;
                        case 'business_max_days':
                            $('#property_type_img').attr('src', '/images/ico-pay-business.svg');
                            $('.large-title').html('Ваш бизнес не нуждается в оплате.');
                            $('#empty_property').modal('show');
                            break;
                        case 'hotel_empty_result':
                            $('#property_type_img').attr('src', '/images/ico-pay-carpet.svg');
                            $('.large-title').html('Вы не владеете отелем.');
                            $('#empty_property').modal('show');
                            break;
                        case 'hotel_max_days':
                            $('#property_type_img').attr('src', '/images/ico-pay-carpet.svg');
                            $('.large-title').html('Ваш отель не нуждается в оплате.');
                            $('#empty_property').modal('show');
                            break;
                    }
                }
                else if(mtype == 9) {
                    switch (message) {
                        case 'empty_property':
                            $('.property-fail').html('<p><strong>Ошибка</strong><br>Имущество не определено...</a></p>').slideDown();
                            break;
                        case 'much_days':
                            $('.property-fail').html('<p><strong>Ошибка</strong><br>Указано слишком большое<br>кол-во дней для оплаты!</a></p>').slideDown();
                            break;
                        case 'incorrect_days':
                            $('.property-fail').html('<p><strong>Ошибка</strong><br>Вы указали некорректное<br>кол-во дней для оплаты!</a></p>').slideDown();
                            break;
                        case 'low_balance':
                            $('.property-fail').html('<p><strong>Ошибка</strong><br>Не хватает наличных средств<br>(игровой валюты) для оплаты.</a></p>').slideDown();
                            break;
                        case 'online_error':
                            $('.property-fail').html('<p><strong>Ошибка</strong><br>Вы не должны быть на сервере<br>во время оплаты имущества!</a></p>').slideDown();
                            break;
                        case 'house_payment_success':
                            $('.modal').modal('hide');
                            setTimeout(function () {
                                $('#property_success_pay_img').attr('src', '/images/ico-pay-home.svg');
                                $('.large-title').html('Вы успешно продлили оплату<br> вашего дома на '+app.property_payed_days+' '+app.get_noun(app.property_payed_days, 'день', 'дня', 'дней')+'.');
                                $('#pay-nice').modal('show');
                            }, 300);
                            break;
                        case 'hotel_payment_success':
                            $('.modal').modal('hide');
                            setTimeout(function () {
                                $('#property_success_pay_img').attr('src', '/images/ico-pay-carpet.svg');
                                $('.large-title').html('Вы успешно продлили оплату<br> вашего отеля на '+app.property_payed_days+' '+app.get_noun(app.property_payed_days, 'день', 'дня', 'дней')+'.');
                                $('#pay-nice').modal('show');
                            }, 300);
                            break;
                        case 'business_payment_success':
                            $('.modal').modal('hide');
                            setTimeout(function () {
                                $('#property_success_pay_img').attr('src', '/images/ico-pay-business.svg');
                                $('.large-title').html('Вы успешно продлили оплату<br> вашего бизнеса на '+app.property_payed_days+' '+app.get_noun(app.property_payed_days, 'день', 'дня', 'дней')+'.');
                                $('#pay-nice').modal('show');
                            }, 300);
                            break;
                    }
                }
            }
        },

        get_server: function () {
            var server_desktop = $('input[name=enterserver]:checked').val();
            var server_mobile = $('select[name=enterserver]').val();
            if (typeof server_desktop == 'undefined' && server_mobile == null) {
                return false;
            } else if (typeof server_desktop == 'undefined' && server_mobile != null) {
                return server_mobile;
            } else if (typeof server_desktop != 'undefined' && server_mobile == null) {
                return server_desktop;
            }
        },

        get_device_type: function() {
            if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
                return 'mobile';
            } else {
                return 'desktop';
            }
        },

        get_noun: function(number, one, two, five) {
            number = Math.abs(number);
            number %= 100;
            if (number >= 5 && number <= 20) {
                return five;
            }
            number %= 10;
            if (number == 1) {
                return one;
            }
            if (number >= 2 && number <= 4) {
                return two;
            }
            return five;
        }
    }
}


$('.loginwarn').click(function () {
    $(this).fadeOut();
});

$('.view-error-resetpw .close-but').click(function () {
    $('.view-error-resetpw').removeClass('on');
});

$('.view-error-userauth .close-but').click(function () {
    $('.view-error-userauth').removeClass('on');
});

$('.pass-new-but').click(function () {
    $(this).prev('.correct').fadeToggle()
});

$('.user-cab-menu-open').click(function () {
    $('.mobile-gamers-list').slideToggle();
});

$('.mobile-gamers-list li a').click(function () {
    $(this).parent().parent().slideToggle();
});

$('#googlecode').on('shown.bs.modal', function () {
    setTimeout(function (){
        $('#gauth_code').focus();
    }, 1000);
});

$('#gauth_code').keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13') {
        app.webgaon_checkcode();
    }
});

$('.roulette_rulet-fail').click(function() {
    $(this).slideUp();
});

$('.size-pay-wrap .add').click(function () {
    var sizein = Number($(this).prev().text());
    if (!(sizein >= app.maxdays)) {
        sizein++;
        $(this).prev().text(sizein);
    }
});

$('.size-pay-wrap .del').click(function () {
    var delbut = $(this);
    var sizein = Number($(this).next().text());
    if (!(sizein <= 1)) {
        sizein--;
        $(delbut).next().text(sizein);
    }
});

tippy('.seccode', {
    animation: 'fade',
    arrow: true,
    distance:0,
    placement: 'bottom',
    hideOnClick: true,
    touchHold:true
});