import React from "react";
import { joyride, Joyridestep } from "react-native-joyride";


const JoyRideWrapper = ({ children, text, order, name }) => {
    return (
        <Joyridestep text={text} order={order} name={name}> 
            {children}
        </Joyridestep>
    );
};


export default joyride(JoyRideWrapper);