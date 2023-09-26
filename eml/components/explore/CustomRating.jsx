
import React from 'react';
import { useEffect, useState } from 'react';
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CustomRating = ({rating = 5}) => {


    const [ratingIcons, setRatingIcons] = useState([
        {
            icon: "favorite-border",
            color: "gray"
        },
        {
            icon: "favorite-border",
            color: "gray"
        },
        {
            icon: "favorite-border",
            color: "gray"

        },
        {
            icon: "favorite-border",
            color: "gray"
        },
        {
            icon: "favorite-border",
            color: "gray"
        },
    ])

    useEffect(() => {
        console.log(rating);

        let newRatingIcons = [...ratingIcons];
        for(let i = 0; i < rating; i++) {
            newRatingIcons[i].icon = "favorite";
            newRatingIcons[i].color = "red";
        }


    }, [])

    return ( 
        <View
        style={{
            width: "100%",
            flexDirection: 'row',
            alignItems: 'start',
            justifyContent: 'start',
            }}
        >
            {ratingIcons.map((icon, index) => (
                 <MaterialIcons key={index} name={icon.icon} size={18} color={icon.color} />
                ))    
            }

        </View>
     );
}
 
export default CustomRating;