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
                layout={{
                    default: [
                        "1 2 3",
                        "4 5 6",
                        "7 8 9",
                        "0 {bksp}"
                    ]
                }}
            />);
}

export default VirtualKeyBoard
