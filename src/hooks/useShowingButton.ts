
import { useState } from "react";

export const useShowingButton = () => {
    
    const [showing, setShowing] = useState(false);

    const handleShowPassword = () => {
        setShowing(!showing);
    };

    return { showing, handleShowPassword };


}