import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';


function VirtualKeyBoard(props) {
    const onChange = (input) => {
        props.onPassword(input)
    }

    const onKeyPress = (button) => {
        //console.log("Button pressed", button);
    }

        return (
            <Keyboard
                onChange={onChange}
                //onKeyPress={onKeyPress}
            />);
}

export default VirtualKeyBoard
