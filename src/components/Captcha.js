import React, { Component } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';


class Captcha extends Component {

    componentDidMount () {
        loadCaptchaEnginge(6);
    };

    doSubmit = () => {
        let user_captcha = document.getElementById('user_captcha_input').value;

        if (validateCaptcha(user_captcha)===true) {
            this.props.onValidate(true)
            loadCaptchaEnginge(6);
            document.getElementById('user_captcha_input').value = "";

        }

        else {
            this.props.onValidate(false)
            document.getElementById('user_captcha_input').value = "";
        }
    };

    render() {


        return (<div>
            <div className="container">
                <div className="form-group">

                    <div className="col mt-3">
                        <LoadCanvasTemplate reloadText="Gerar Novo Codigo"/>
                    </div>

                    <div className="col mt-3">
                        <div><input placeholder="Codigo Captcha" id="user_captcha_input" name="user_captcha_input" type="text"></input></div>
                    </div>

                    <div className="col mt-3">
                        <div><button class="btn btn-primary" onClick={() => this.doSubmit()}>OK</button></div>
                    </div>

                </div>

            </div>
        </div>);
    };
}

export default Captcha;
