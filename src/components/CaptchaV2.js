import ReCAPTCHA from "react-google-recaptcha";
import {render} from "react-dom";

function onChange(value) {
    console.log("Captcha value:", value);
}

render(
    <ReCAPTCHA
        sitekey="Your client site key"
        onChange={onChange}
    />,
);
